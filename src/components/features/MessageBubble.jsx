import { formatTime } from '../../utils'

const renderContent = (content) => {
  const lines = content.split('\n').filter((l) => l.trim())
  if (lines.length <= 1) return <span>{content}</span>

  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const isBullet = /^[-•*]\s/.test(line.trim())
        const lineText = isBullet ? line.trim().replace(/^[-•*]\s/, '') : line
        return isBullet ? (
          <div key={i} className="flex gap-1.5 items-start">
            <span className="mt-0.5 text-blue-400 flex-shrink-0">•</span>
            <span>{lineText}</span>
          </div>
        ) : (
          <div key={i}>{lineText}</div>
        )
      })}
    </div>
  )
}

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
          }`}
        >
          {renderContent(message.content)}
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1 select-none">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}

export default MessageBubble
