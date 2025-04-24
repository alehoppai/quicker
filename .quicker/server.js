import Fastify from 'fastify'

import InitRoutes from './routes/init-routes.js'

const fastify = Fastify({
  logger: true,
})

fastify.register(InitRoutes)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
