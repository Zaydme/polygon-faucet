// If you prefer async/await, use the following
export default async function(fastify, opts) {
  fastify.get('/', async function(request, reply) {
    return { root: true };
  });
  fastify.get('/info', async function(request, reply) {
    const faucetBalance = await fastify.getEthBalance();
    const latest10Transactions = await fastify.mongo.db
      .collection('transactions')
      .find({})
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .toArray();

    return {
      faucetBalance,
      claimTimeout: opts.config.timeouts.claimTimeout,
      latest10Transactions,
    };
  });
}
