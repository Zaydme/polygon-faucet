import { validateEnvironment } from './validate-environment';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
dotenv.config();
validateEnvironment(process.env);
import fastify from 'fastify';
import app from './app';
import config from './config';

const server = fastify({
  logger: true,
  https: {
    key: readFileSync(config.https.keyPath),
    cert: readFileSync(config.https.certPath),
  },
});

const start = async () => {
  try {
    server.register(app, { config });
    await server.listen(
      process.env.PORT ? Number(process.env.PORT) : 3001,
      '0.0.0.0',
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
