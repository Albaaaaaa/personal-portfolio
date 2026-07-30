import type { ViteDevServer } from 'vite'
import { handleChatRequest } from './api/chat.js'

/**
 * Vite plugin that mounts /api/chat as a dev server endpoint.
 * This proxies requests to the same handler used in production.
 */
export function apiDevMiddleware() {
  return {
    name: 'api-dev-middleware',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/chat', async (req, res) => {
        // Build a Web Request from Node's req/res.
        const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

        // Convert headers to a plain object
        const headers: Record<string, string> = {}
        for (const [key, value] of Object.entries(req.headers || {})) {
          if (typeof value === 'string') {
            headers[key] = value
          }
        }

        // Read body if POST
        let body: string | undefined
        if (req.method === 'POST') {
          body = await new Promise<string>((resolve) => {
            let data = ''
            req.on('data', chunk => { data += chunk })
            req.on('end', () => resolve(data))
          })
        }

        const request = new Request(url.toString(), {
          method: req.method,
          headers: headers,
          body: body,
        })

        const response = await handleChatRequest(request)

        res.statusCode = response.status
        for (const [key, value] of response.headers) {
          res.setHeader(key, value)
        }

        if (response.body) {
          const reader = response.body.getReader()
          const decoder = new TextDecoder()
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            res.write(decoder.decode(value))
          }
        }
        res.end()
      })
    },
  }
}
