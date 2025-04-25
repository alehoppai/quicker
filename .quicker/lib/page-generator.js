import fs from 'node:fs'
import path from 'node:path'
import render from './renderer.js'
import pageTemplate from '../templates/page-template.js'
import { config } from '../../quicker.config.js'

const __root = path.resolve()

export default async function () {
  const pagesPath = path.join(__root, 'pages')

  const pageFiles = fs.readdirSync(pagesPath, { recursive: true })

  for (const pageFile of pageFiles) {
    const filePath = path.join(pagesPath, pageFile)
    const data = (await import(filePath)).default

    if (data.preload) {
      if (typeof data.preload === 'function') {
        console.info(filePath, 'preload parsed...')
      } else {
        throw new Error(
          `[${filePath}] export contains preload, but it's not a function`
        )
      }
    }

    const pageDataRaw = data.page()
    const pgeDataString = render(pageDataRaw)

    const genRoutePath = path.join(
      __root,
      `.quicker/routes/auto/${data.path}.js`
    )
    const htmlString = pageTemplate({ title: data.title, data: pgeDataString })

    const routeTemplateString = `
export default async function ${data.path}(fastify, options) {
  fastify.get('/${data.path}', async (request, reply) => {
    reply.type('text/html').send(\`${htmlString}\`)
  })
}
  `

    fs.writeFileSync(genRoutePath, routeTemplateString)
  }
}
