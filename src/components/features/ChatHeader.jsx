import { BOT_NAME, BOT_SUBTITLE } from '../../constants'

const ChatHeader = () => (
  <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 rounded-t-2xl">
    <div className="relative flex-shrink-0">
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg select-none">
        D
      </div>
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
    </div>
    <div className="min-w-0">
      <h1 className="font-semibold text-gray-900 text-sm leading-tight truncate">{BOT_NAME}</h1>
      <p className="text-xs text-green-600 flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
        Online
      </p>
    </div>
    <p className="ml-auto text-xs text-gray-400 hidden sm:block">{BOT_SUBTITLE}</p>
  </div>
)

export default ChatHeader
