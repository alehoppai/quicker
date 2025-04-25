import fs from 'node:fs'
import path from 'node:path'

import { config } from '../../quicker.config.js'

const __root = path.resolve()
const apiDir = path.join(__root, '.quicker/api/auto')

export default async function () {
  for (const [name, endpoint] of Object.entries(config.endpoints)) {
    let content = `
import * as ${name}Api from "../../../api/auto/${name}.js"

export default async function ${name}ApiRoutes(fastify, options) {
`

    for (const method of endpoint.methods) {
      const param = method.split('_')
      const apiFunctionName = `${method.toLowerCase()}_${name.toLowerCase()}`

      content += param[1]
        ? `
  fastify.get('/api/${name}/:${param[1]}', async (request, reply) => {
    try {
      const { ${param[1]} } = request.params;
      const response = await ${name}Api.${apiFunctionName}(${param[1]})
      reply.code(200).send({data: response, error: null})
    } catch (error) {
      console.log(error)
      reply.code(400).send({data: null, error: error.message})
    }
  })
      `
        : `
  fastify.get('/api/${name}', async (request, reply) => {
    try {
      const response = await ${name}Api.${apiFunctionName}()
      reply.code(200).send({data: response, error: null})
    } catch (error) {
      console.log(error)
      reply.code(400).send({data: null, error: error.message})
    }
  })
      `
    }

    content += `
}
    `

    const filePath = path.join(
      path.resolve(),
      '.quicker/routes/auto/api',
      `${name}.js`
    )
    fs.writeFileSync(filePath, content)
  }
}
