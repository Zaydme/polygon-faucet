import fp from 'fastify-plugin'
import mongoPlugin from 'fastify-mongodb'
import { FastifyInstance } from 'fastify'

export default fp(async (fastify: FastifyInstance, opts: any, next: any) => {
  fastify.register(mongoPlugin, {
    url: opts.config.mongo.url,
  })
  next()
})