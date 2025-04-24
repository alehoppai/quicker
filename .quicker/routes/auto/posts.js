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
    <div id="root"><h3 >Do you want to participate?</h3><form ><label for="name-input">Name</label><input placeholder="Type your text here",id="name-input",name="name-input" /><span >Type name of a participant</span><button type="submit">Participate!</button></form></div>
  </body>
</html>
`)
  })
}
