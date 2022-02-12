module.exports = {
  mongo: {
    url: process.env.MONGO_URL,
  },
  timeouts: {
    claimTimeout: 43200000,
  },
  hCaptchaSecret: process.env.HCAPTCHA_SECRET,
  network: {
    rpc: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com',
    privateKey: process.env.PRIVATE_KEY,
    gasLimit: '314150',
    tokens: {
      matic: {
        amount: 0.001,
        maxbalance: 50000000000000000,
      },
    },
  },
};
