import fp from 'fastify-plugin';
import Web3 from 'web3';
import { FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance, opts: any, next: any) => {
  const web3 = new Web3(opts.config.network.rpc);
  web3.eth.accounts.wallet.add(opts.config.network.privateKey);

  const getEthBalance = async (address?: string) => {
    return await web3.eth.getBalance(
      address ? address : web3.eth.accounts.wallet[0].address,
    );
  };

  const transferMatic = async (address: string, amount: number) => {
    const receipt = await web3.eth
      .sendTransaction({
        from: web3.eth.accounts.wallet[0].address,
        to: address,
        value: web3.utils.toWei(amount.toString(), 'ether'),
        gas: opts.config.network.gasLimit,
        gasPrice: await web3.eth.getGasPrice(),
      })
      .catch(err => {
        if (
          err.message ===
          'Returned error: insufficient funds for gas * price + value'
        ) {
          throw new Error(
            'Faucet balance is too low, please try again later or consider donating (please!)',
          );
        }
        throw err;
      });
    return receipt.transactionHash;
  };

  fastify.decorate('web3', web3);
  fastify.decorate('getEthBalance', getEthBalance);
  fastify.decorate('transferMatic', transferMatic);
  next();
});
