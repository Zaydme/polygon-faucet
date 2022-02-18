import axios from 'axios';
import Web3 from 'web3';
import { hCaptchaSecret } from '../../config';
import { fixAddress, isAddress } from './_helpers';
import moment from 'moment';

export default async function(fastify, opts) {
  fastify.post(
    '/:wallet',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            wallet: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          properties: {
            hCaptchaResponse: { type: 'string' },
          },
        },
      },
    },
    async function(request, reply) {
      const { hCaptchaResponse } = request.body;

      const params = new URLSearchParams();
      params.append('secret', opts.config.hCaptchaSecret);
      params.append('response', hCaptchaResponse);

      const {
        data: { success },
      } = await axios.post('https://hcaptcha.com/siteverify', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!success) {
        throw new Error('hCaptcha failed');
      }

      const { wallet } = request.params;
      const fixedAddress = fixAddress(wallet);
      if (!isAddress(fixedAddress))
        throw new Error(`Invalid wallet address: ${wallet}`);

      const walletExists = await fastify.mongo.db
        .collection('wallets')
        .findOne({
          $or: [
            {
              address: fixedAddress,
            },
            {
              ipAddresses: {
                $in: [request.headers['x-forwarded-for']],
              },
            },
          ],
          lastClaimed: {
            $gte: new Date(Date.now() - opts.config.timeouts.claimTimeout),
          },
        });

      if (walletExists) {
        throw new Error(
          `You have already claimed in the last 12 hours. Please try again ${moment(
            moment(walletExists.lastClaimed).add(
              opts.config.timeouts.claimTimeout,
              'ms',
            ),
          ).fromNow()}.`,
        );
      }

      const walletBalance = await fastify.getEthBalance(fixedAddress);
      if (walletBalance >= opts.config.network.tokens.matic.maxbalance) {
        throw new Error(
          `You are way too rich to claim tokens. Your balance is ${fastify.web3.utils.fromWei(
            walletBalance,
            'ether',
          )} MATIC`,
        );
      }

      const hash = await fastify.transferMatic(
        fixedAddress,
        opts.config.network.tokens.matic.amount,
      );

      const walletObj = {
        address: fixedAddress,
        balance: walletBalance,
        lastClaimed: new Date(),
      };

      fastify.mongo.db.collection('wallets').updateOne(
        { address: fixedAddress },
        {
          $set: walletObj,
          $addToSet: { ipAddresses: request.headers['x-forwarded-for'] },
          $push: { transactionHashes: hash },
          $inc: { claimCount: 1 },
        },
        { upsert: true },
      );

      const tx = await fastify.mongo.db.collection('transactions').insertOne({
        hash,
        address: fixedAddress,
        amount: opts.config.network.tokens.matic.amount,
        createdAt: new Date(),
      });

      return tx.ops[0];
    },
  );
}

module.exports.autoPrefix = '/supply';
