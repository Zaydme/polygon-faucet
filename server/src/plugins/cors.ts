import fp from 'fastify-plugin'
import cors from 'fastify-cors'
import { FastifyInstance } from 'fastify'

export default fp(async (fastify: FastifyInstance, opts: any, next: any) => {
  fastify.register(cors, Object.assign ({}, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }, opts.cors))
  next()
})