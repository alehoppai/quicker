import fs from 'node:fs'
import path from 'node:path'

import { config } from '../../quicker.config.js'

export default function () {
  for (const [name, endpoint] of Object.entries(config.endpoints)) {
    let content = ``

    for (const method of endpoint.methods) {
      const param = method.split('_')
      const genericParam = '/${' + param[1] + '}'

      content += `
export async function ${method.toLowerCase()}_${name.toLowerCase()} (${
        param[1] ?? ''
      }) {
  const response = await fetch(\`${config.apiUrl}/${endpoint.path}${
        param[1] ? genericParam : ''
      }\`, {
    method: "${param[0]}",
    headers: { 'Content-Type': 'application/json' },
  })
  
  return await response.json()
} 
      `
    }

    const filePath = path.join(
      path.resolve(),
      '.quicker/api/auto',
      `${name}.js`
    )
    fs.writeFileSync(filePath, content)
  }
}
