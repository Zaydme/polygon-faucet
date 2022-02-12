import path from 'path';
import AutoLoad from 'fastify-autoload';

export default function (fastify, opts, next) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
    includeTypeScript: true,
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts),
    includeTypeScript: true,
  });

  next();
}
