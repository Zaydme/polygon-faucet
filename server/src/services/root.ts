// If you prefer async/await, use the following
export default async function(fastify, opts) {
  fastify.get('/', async function(request, reply) {
    return { root: true };
  });
  fastify.get('/info', async function(request, reply) {
    const faucetBalance = await fastify.getEthBalance();
    const latest20Transactions = await fastify.mongo.db
      .collection('transactions')
      .find({})
      .sort({
        createdAt: -1,
      })
      .limit(20)
      .toArray();

    return {
      faucetBalance: fastify.web3.utils.fromWei(faucetBalance, 'ether'),
      claimTimeout: opts.config.timeouts.claimTimeout,
      latest20Transactions,
    };
  });
}
