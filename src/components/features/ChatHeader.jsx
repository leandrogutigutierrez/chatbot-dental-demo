import { BOT_NAME, BOT_SUBTITLE } from '../../constants'

const ChatHeader = ({ onClose }) => (
  <div className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-t-2xl">
    <div className="relative flex-shrink-0">
      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-base select-none">
        D
      </div>
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-blue-600" />
    </div>
    <div className="min-w-0 flex-1">
      <h1 className="font-semibold text-white text-sm leading-tight truncate">{BOT_NAME}</h1>
      <p className="text-xs text-blue-100 flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
        Online · {BOT_SUBTITLE}
      </p>
    </div>
    {onClose && (
      <button
        onClick={onClose}
        className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Close chat"
      >
        ✕
      </button>
    )}
  </div>
)

export default ChatHeader
