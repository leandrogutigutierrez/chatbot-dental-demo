import { useState, useCallback } from 'react'
import { useChat } from '../../hooks/useChat'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import QuickReplies from './QuickReplies'

const BubbleIcon = ({ isOpen }) =>
  isOpen ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clipRule="evenodd" />
    </svg>
  )

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isLoading, error, hasStarted, send, clearError } = useChat()

  const handleQuickReply = useCallback((text) => send(text), [send])
  const handleClose = useCallback(() => setIsOpen(false), [])
  const handleToggle = useCallback(() => setIsOpen((v) => !v), [])

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[370px] max-w-[calc(100vw-2rem)] h-[540px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100">
          <ChatHeader onClose={handleClose} />

          {messages.length === 0 && !isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🦷</span>
              </div>
              <h2 className="text-gray-800 font-semibold text-base mb-1">Hi there!</h2>
              <p className="text-gray-500 text-sm">Ask me anything about our services, hours, or appointments.</p>
            </div>
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}

          {error && (
            <div className="mx-3 mb-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
              <span className="text-red-600 text-xs">{error}</span>
              <button onClick={clearError} className="text-red-400 hover:text-red-600 ml-2 text-xs focus:outline-none">✕</button>
            </div>
          )}

          {!hasStarted && <QuickReplies onSelect={handleQuickReply} disabled={isLoading} />}

          <ChatInput onSend={send} disabled={isLoading} />
        </div>
      )}

      {/* Floating bubble button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
        aria-label="Open chat"
      >
        <BubbleIcon isOpen={isOpen} />
      </button>
    </>
  )
}

export default ChatWidget
