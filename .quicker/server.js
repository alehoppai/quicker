import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

import InitRoutes from './routes/init-routes.js'

const fastify = Fastify({
  logger: true,
})

fastify.register(fastifyStatic, {
  root: path.join(path.resolve(), '.quicker/public'),
})

fastify.register(InitRoutes)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
