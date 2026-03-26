import { useState, useCallback, useRef, useEffect } from 'react'
import Button from '../ui/Button'
import { useVoice } from '../../hooks/useVoice'

const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4Z" />
    <path d="M19 11a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 6 6.93V20H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.07A7 7 0 0 0 19 11Z" />
  </svg>
)

const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState('')
  const [isInterim, setIsInterim] = useState(false)
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

  const handleTranscript = useCallback((transcript, interim) => {
    setText(transcript)
    setIsInterim(interim)
  }, [])

  const { isSupported, isListening, start, stop } = useVoice(handleTranscript)

  const handleSubmit = useCallback(() => {
    if (!text.trim() || disabled || isInterim) return
    onSend(text.trim())
    setText('')
  }, [text, disabled, isInterim, onSend])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit],
  )

  const handleMic = useCallback(() => {
    if (isListening) {
      stop()
    } else {
      setText('')
      setIsInterim(false)
      start()
    }
  }, [isListening, start, stop])

  return (
    <div className="flex items-end gap-2 px-3 py-3 border-t border-gray-200 bg-white rounded-b-2xl">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => { setText(e.target.value); setIsInterim(false) }}
        onKeyDown={handleKeyDown}
        placeholder={isListening ? 'Listening...' : 'Type or speak a message...'}
        rows={1}
        disabled={disabled}
        className={`flex-1 resize-none rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed custom-scrollbar transition-colors duration-150 ${
          isInterim
            ? 'border-blue-300 text-gray-400'
            : 'border-gray-300 text-gray-900'
        }`}
      />
      {isSupported && (
        <button
          onClick={handleMic}
          disabled={disabled}
          title={isListening ? 'Stop recording' : 'Speak'}
          className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
            isListening
              ? 'bg-red-100 text-red-500 animate-pulse'
              : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <MicIcon />
        </button>
      )}
      <Button
        onClick={handleSubmit}
        disabled={disabled || !text.trim() || isInterim}
        className="flex-shrink-0"
      >
        Send
      </Button>
    </div>
  )
}

export default ChatInput
