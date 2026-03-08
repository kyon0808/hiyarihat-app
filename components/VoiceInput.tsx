'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  onResult: (text: string) => void
  disabled?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyWindow = typeof window & Record<string, any>

export default function VoiceInput({ onResult, disabled }: Props) {
  const [supported, setSupported] = useState(false)
  const [recording, setRecording] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null)

  useEffect(() => {
    const w = window as AnyWindow
    if (w.SpeechRecognition || w.webkitSpeechRecognition) {
      setSupported(true)
    }
  }, [])

  const toggle = () => {
    if (recording) {
      recRef.current?.stop()
      setRecording(false)
      return
    }
    const w = window as AnyWindow
    const SpeechRec = w.SpeechRecognition || w.webkitSpeechRecognition
    if (!SpeechRec) return
    const rec = new SpeechRec()
    rec.lang = 'ja-JP'
    rec.interimResults = false
    rec.onresult = (e: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => {
      const transcript = Array.from(e.results as unknown as ArrayLike<{ [index: number]: { transcript: string } }>)
        .map((r) => r[0].transcript)
        .join('')
      onResult(transcript)
    }
    rec.onend = () => setRecording(false)
    rec.onerror = () => setRecording(false)
    rec.start()
    recRef.current = rec
    setRecording(true)
  }

  if (!supported) return null

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      title={recording ? '録音停止' : '音声入力'}
      className={`p-2 rounded-full transition-colors ${
        recording
          ? 'bg-red-500 text-white animate-pulse'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } disabled:opacity-40`}
    >
      {recording ? '⏹' : '🎤'}
    </button>
  )
}
