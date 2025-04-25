import fs from 'node:fs'
import path from 'node:path'

export default async function (fastify, options) {
  const autoPath = path.join(path.resolve(), '.quicker/routes/auto')
  const files = fs.readdirSync(autoPath, { recursive: true })

  for (const file of files) {
    if (!file.includes('.js')) continue
    const filePath = path.join(autoPath, file)
    const route = (await import(filePath)).default
    route(fastify, options)
  }
}
