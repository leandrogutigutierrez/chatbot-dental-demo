import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT =
  'You are a friendly assistant for Dental Care Pro dental clinic. Help users with: appointment scheduling info, services (cleanings $80, whitening $200, braces consultation free), hours (Mon-Fri 8am-6pm, Sat 9am-2pm), location (123 Main St). Be warm, professional, answer in the same language the user writes. When listing multiple items, use line breaks (one item per line starting with -) instead of comma-separated lists. Keep responses concise.'

async function pickFreeModel() {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` },
    })
    const { data } = await res.json()
    const free = data.filter((m) => m.id.endsWith(':free'))
    if (free.length === 0) throw new Error('No free models found')
    console.log(`🆓 Free models available (${free.length}): ${free.map((m) => m.id).join(', ')}`)
    return free[0].id
  } catch (err) {
    console.error('Could not fetch models, falling back to openrouter/auto:', err.message)
    return 'openrouter/auto'
  }
}

let MODEL = 'openrouter/auto'

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request: messages array required' })
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Dental Chatbot',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const status = response.status
      if (process.env.NODE_ENV !== 'production') {
        console.error(`OpenRouter error ${status}:`, JSON.stringify(data))
      }
      const message =
        status === 401 || status === 403
          ? 'Invalid API key. Check your OPENROUTER_API_KEY in .env'
          : 'Failed to get a response. Please try again.'
      return res.status(status >= 400 && status < 500 ? status : 500).json({ error: message })
    }

    const text = data.choices?.[0]?.message?.content ?? ''
    res.json({ content: text })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('OpenRouter API error:', error.message)
    }
    res.status(500).json({ error: 'Failed to get a response. Please try again.' })
  }
})

MODEL = await pickFreeModel()

app.listen(PORT, () => {
  console.log(`✅ Express server running on http://localhost:${PORT} — model: ${MODEL}`)
})
