import Button from '../ui/Button'
import { QUICK_REPLIES } from '../../constants'

const QuickReplies = ({ onSelect, disabled }) => (
  <div className="px-4 py-3 border-t border-gray-100">
    <p className="text-xs text-gray-400 mb-2">Quick replies:</p>
    <div className="flex flex-wrap gap-2">
      {QUICK_REPLIES.map(({ id, label, text }) => (
        <Button
          key={id}
          variant="quick"
          onClick={() => onSelect(text)}
          disabled={disabled}
        >
          {label}
        </Button>
      ))}
    </div>
  </div>
)

export default QuickReplies
