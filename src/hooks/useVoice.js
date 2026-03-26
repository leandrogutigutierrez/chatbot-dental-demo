import { useState, useCallback, useRef } from 'react'

export const useVoice = (onTranscript) => {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)

  const isSupported =
    typeof window !== 'undefined' &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition)

  const start = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return

    const recognition = new SR()
    recognition.continuous = false
    recognition.interimResults = true

    recognition.onstart = () => setIsListening(true)

    recognition.onresult = (event) => {
      const isFinal = event.results[event.results.length - 1].isFinal
      // Join each result with a space — avoids comma artifacts from the API
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript.trim())
        .join(' ')
      onTranscript(transcript, !isFinal)
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }, [onTranscript])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  return { isSupported, isListening, start, stop }
}
