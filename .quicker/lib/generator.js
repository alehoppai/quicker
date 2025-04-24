import fs from 'node:fs'
import path from 'node:path'
import render from './renderer.js'

const __root = path.resolve()
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
  const htmlString = render(pageDataRaw)

  const genRoutePath = path.join(__root, `.quicker/routes/auto/${data.path}.js`)
  const rootTemplatePath = path.join(__root, '.quicker/template.html')
  let templateContent = fs.readFileSync(rootTemplatePath, { encoding: 'utf-8' })
  templateContent = templateContent.replace('{{INSERT}}', htmlString)

  const routeTemplateString = `
export default async function ${data.path}(fastify, options) {
  fastify.get('/${data.path}', async (request, reply) => {
    reply.type('text/html').send(\`${templateContent}\`)
  })
}
  `

  fs.writeFileSync(genRoutePath, routeTemplateString)
}
