export const formatTime = (date) =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date)

export const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
