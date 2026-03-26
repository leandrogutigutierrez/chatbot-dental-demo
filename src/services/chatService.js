import { API_URL } from '../constants'

/**
 * Sends the conversation history to the Express backend,
 * which proxies the request to the Anthropic API.
 * @param {{ role: string, content: string }[]} messages
 */
export const sendMessage = async (messages) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error ?? `Request failed (${response.status})`)
  }

  return data
}
