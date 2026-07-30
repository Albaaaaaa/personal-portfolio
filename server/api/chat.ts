/**
 * Serverless handler for /api/chat.
 * Used by Vite dev middleware and Vercel serverless function.
 *
 * Receives: { messages: Array<{ role: 'user'|'assistant'|'system', content: string }> }
 * Returns: SSE stream from Groq
 */

import '../load-env.js'

const SYSTEM_PROMPT = `You are an AI assistant embedded in Muhammad Ulil Albab's portfolio website. Your job is to help visitors learn about Muhammad Ulil Albab — a Software Engineer & AI Engineer based in Samarinda, Indonesia.

Key facts about Muhammad Ulil Albab:
- Fresh graduate in Informatics Engineering from Universitas Muhammadiyah Kalimantan Timur
- Graduated Cum Laude with GPA 3.95/4.00, Best Graduate of the Faculty of Science and Technology
- Focus areas: Software Engineering and Artificial Intelligence
- Experience: Software Engineer at Dinas Perpustakaan dan Kearsipan Kota Samarinda (Jul–Sep 2024), building archive management systems with CodeIgniter 4 and MySQL
- Skills: Backend (PHP, CodeIgniter 4), Database (MySQL), AI/ML (Python, Computer Vision, CNN, SVR, Genetic Algorithm), Data Science (Microsoft Fabric, Data Engineering, Probability & Statistics)
- Published research: "Hybrid Support Vector Regression-Genetic Algorithm Model for Forecasting Stock Price" in IJAIDM (March 2026)
- Has 6+ projects on GitHub, including facial expression recognition, diabetes detection, and an Islamic companion app
- Holds certifications: IBM IT Support, edX Probability & Statistics, edX Python for Data Engineering, Dicoding Data Science with Microsoft Fabric, BNSP Associate Data Scientist, TOEFL Prediction Test

Tone: Professional, warm, and helpful. Be concise but informative. If you don't know something about Muhammad Ulil Albab that's not in this context, say so honestly and suggest the visitor reaches out via the contact form.

When relevant, direct visitors to specific sections of the portfolio: #about, #experience, #skills, #portfolio, #publikasi, #sertifikasi, #contact.`

export async function handleChatRequest(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Type guard to check if body has messages
  const isValidBody = (b: unknown): b is { messages: Array<{ role: string; content: string }> } => {
    return typeof b === 'object' && b !== null && 'messages' in b && Array.isArray((b as any).messages)
  }

  if (!isValidBody(body)) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const messages = body.messages

  if (!messages || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages array is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY
  const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'

  if (!GROQ_API_KEY) {
    console.error('Missing GROQ_API_KEY in environment')
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const fullMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages,
  ]

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: fullMessages,
        stream: true,
        max_tokens: 2048,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API error:', response.status, errorText)
      return new Response(JSON.stringify({ error: errorText }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.error(new Error('Failed to read stream'))
          return
        }

        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed || trimmed === 'data: [DONE]') continue
            if (!trimmed.startsWith('data: ')) continue

            try {
              const payload = JSON.parse(trimmed.slice(6))
              const content = payload.choices?.[0]?.delta?.content
              if (content) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
              }
            } catch {
              // skip malformed
            }
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Handler error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// Vercel serverless entry point.
export default async function handler(
  req: { method: string; body: any; headers: Record<string, string>; url?: string },
  res: {
    status: (code: number) => any
    setHeader: (key: string, value: string) => void
    write: (chunk: string) => void
    end: () => void
  },
) {
  const url = req.url || '/'
  // Convert headers to a plain object for the Request constructor
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (typeof value === 'string') {
      headers.set(key, value)
    }
  }
  const request = new Request(url, {
    method: req.method,
    headers: headers,
    body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
  })
  const response = await handleChatRequest(request)

  res.status(response.status)
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
}