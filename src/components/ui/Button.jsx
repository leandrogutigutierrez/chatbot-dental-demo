const VARIANTS = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-4 py-2 text-sm',
  ghost:
    'text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:ring-gray-400 px-3 py-2 text-sm',
  quick:
    'bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:ring-blue-300 px-3 py-2 text-xs shadow-sm',
}

const BASE =
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${BASE} ${VARIANTS[variant]} ${className}`}
  >
    {children}
  </button>
)

export default Button
