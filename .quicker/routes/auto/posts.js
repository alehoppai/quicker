
export default async function posts(fastify, options) {
  fastify.get('/posts', async (request, reply) => {
    reply.type('text/html').send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>Hello, World</div>
  </body>
</html>
`)
  })
}
  