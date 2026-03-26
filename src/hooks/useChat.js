import { useState, useCallback, useRef } from 'react'
import { sendMessage } from '../services/chatService'
import { generateId } from '../utils'

// Order: imports → constants → hooks → handlers → (returned)

const createMessage = (role, content) => ({
  id: generateId(),
  role,
  content,
  timestamp: new Date(),
})

export const useChat = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasStarted, setHasStarted] = useState(false)

  // historyRef lets us read the current messages synchronously inside async callbacks
  // without stale closure issues (React state updates are batched/async).
  const historyRef = useRef([])

  const appendMessage = useCallback((role, content) => {
    const message = createMessage(role, content)
    historyRef.current = [...historyRef.current, message]
    setMessages(historyRef.current)
    return message
  }, [])

  const send = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      setError(null)
      setHasStarted(true)
      appendMessage('user', trimmed)
      setIsLoading(true)

      try {
        // historyRef.current already includes the new user message
        const apiMessages = historyRef.current.map(({ role, content }) => ({
          role,
          content,
        }))
        const data = await sendMessage(apiMessages)
        appendMessage('assistant', data.content)
      } catch (err) {
        setError(err.message || 'Something went wrong. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, appendMessage],
  )

  const clearError = useCallback(() => setError(null), [])

  return { messages, isLoading, error, hasStarted, send, clearError }
}
