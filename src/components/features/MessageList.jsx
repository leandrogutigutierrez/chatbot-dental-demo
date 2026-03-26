import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from '../ui/TypingIndicator'

const MessageList = ({ messages, isLoading }) => {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
            <TypingIndicator />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList
