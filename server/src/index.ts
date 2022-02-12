import { validateEnvironment } from './validate-environment';
import dotenv from 'dotenv';
dotenv.config();
validateEnvironment(process.env);
import fastify from 'fastify';
import app from './app';
import config from './config';

const server = fastify({
  logger: true,
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
