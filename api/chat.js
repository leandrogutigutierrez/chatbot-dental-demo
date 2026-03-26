import 'dotenv/config'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT =
  'You are a friendly assistant for Dental Care Pro dental clinic. Help users with: appointment scheduling info, services (cleanings $80, whitening $200, braces consultation free), hours (Mon-Fri 8am-6pm, Sat 9am-2pm), location (123 Main St). Be warm, professional, answer in the same language the user writes.'

// Cached per serverless instance (survives warm invocations)
let cachedModel = null

async function getModel() {
  if (cachedModel) return cachedModel
  try {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
    })
    const { data } = await res.json()
    const free = data.filter((m) => m.id.endsWith(':free'))
    cachedModel = free.length > 0 ? free[0].id : 'openrouter/auto'
  } catch {
    cachedModel = 'openrouter/auto'
  }
  return cachedModel
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request: messages array required' })
  }

  try {
    const model = await getModel()

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://dental-care-pro.vercel.app',
        'X-Title': 'Dental Chatbot',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const status = response.status
      const message =
        status === 401 || status === 403
          ? 'Invalid API key. Check your OPENROUTER_API_KEY in Vercel environment variables.'
          : 'Failed to get a response. Please try again.'
      return res.status(status >= 400 && status < 500 ? status : 500).json({ error: message })
    }

    const text = data.choices?.[0]?.message?.content ?? ''
    res.json({ content: text })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get a response. Please try again.' })
  }
}
