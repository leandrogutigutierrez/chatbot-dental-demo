import { useCallback } from 'react'
import { useChat } from './hooks/useChat'
import ChatHeader from './components/features/ChatHeader'
import ChatInput from './components/features/ChatInput'
import MessageList from './components/features/MessageList'
import QuickReplies from './components/features/QuickReplies'

const App = () => {
  const { messages, isLoading, error, hasStarted, send, clearError } = useChat()

  const handleQuickReply = useCallback(
    (text) => {
      send(text)
    },
    [send],
  )

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl flex flex-col h-[600px] sm:h-[680px]">
        <ChatHeader />

        {messages.length === 0 && !isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🦷</span>
            </div>
            <h2 className="text-gray-800 font-semibold text-lg mb-1">Welcome!</h2>
            <p className="text-gray-500 text-sm">
              I'm here to help you with appointments, services, and more.
            </p>
          </div>
        )}

        {messages.length > 0 && (
          <MessageList messages={messages} isLoading={isLoading} />
        )}

        {error && (
          <div className="mx-4 mb-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
            <span className="text-red-600 text-xs">{error}</span>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600 ml-2 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {!hasStarted && (
          <QuickReplies onSelect={handleQuickReply} disabled={isLoading} />
        )}

        <ChatInput onSend={send} disabled={isLoading} />
      </div>
    </div>
  )
}

export default App
