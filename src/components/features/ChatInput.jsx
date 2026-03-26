import { useState, useCallback, useRef, useEffect } from 'react'
import Button from '../ui/Button'

const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [text, adjustHeight])

  const handleSubmit = useCallback(() => {
    if (!text.trim() || disabled) return
    onSend(text)
    setText('')
  }, [text, disabled, onSend])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit],
  )

  return (
    <div className="flex items-end gap-2 px-4 py-3 border-t border-gray-200 bg-white rounded-b-2xl">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        rows={1}
        disabled={disabled}
        className="flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed custom-scrollbar"
      />
      <Button
        onClick={handleSubmit}
        disabled={disabled || !text.trim()}
        className="flex-shrink-0"
      >
        Send
      </Button>
    </div>
  )
}

export default ChatInput
