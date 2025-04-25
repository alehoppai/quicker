import fs from 'node:fs'
import path from 'node:path'

const __root = path.resolve()

export default async function() {
  const pagesPath = path.join(__root, 'pages')

  const pageFiles = fs.readdirSync(pagesPath, { recursive: true })

  for (const pageFile of pageFiles) {
    const pageModule = (await import(path.join(pagesPath, pageFile))).default
    const routeTemplateString = `
import * as ${pageModule.path}Api from '${path.join(__root, `.quicker/api/auto/${pageModule.path}.js`)}'
import render from '${path.join(__root, '.quicker/lib/renderer.js')}'
import pageTemplate from '${path.join(__root, '.quicker/templates/page-template.js')}'
import page from '${path.join(pagesPath, pageFile)}'

export default async function ${pageModule.path}(fastify, options) {
  fastify.get('/${pageModule.path}', async (request, reply) => {
    try {
      const posts = await ${pageModule.path}Api.get_${pageModule.path}()
      reply.type('text/html').send(pageTemplate({title: '', data: render(page.page({ posts }))}))
    } catch {
      reply.code(500).send("500 Internal server error")
    }
  })
}
  `

    const genRoutePath = path.join(
      __root,
      `.quicker/routes/auto/${pageModule.path}.js`
    )
    fs.writeFileSync(genRoutePath, routeTemplateString)
  }
}
