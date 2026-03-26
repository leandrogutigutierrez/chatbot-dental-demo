import { formatTime } from '../../utils'

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
          }`}
        >
          {message.content}
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1 select-none">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}

export default MessageBubble
