
export default async function posts(fastify, options) {
  fastify.get('/posts', async (request, reply) => {
    reply.type('text/html').send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/quicker.css" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"><h3 >Do you want to participate?</h3><form ><div class="form-item"><label for="name-input">Name</label><input placeholder="Type your text here",id="name-input",name="name-input" /><span class="form-item-description">Type name of a participant</span></div><button type="submit">Participate!</button></form></div>
  </body>
</html>
`)
  })
}
  