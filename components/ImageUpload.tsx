'use client'

import { useRef, useState } from 'react'

interface Props {
  value?: string
  onChange: (dataUrl: string | undefined) => void
}

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (file: File) => {
    const canvas = document.createElement('canvas')
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const MAX = 1200
      let w = img.width
      let h = img.height
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round((h * MAX) / w); w = MAX }
        else { w = Math.round((w * MAX) / h); h = MAX }
      }
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d')!.drawImage(img, 0, 0, w, h)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7)
      URL.revokeObjectURL(url)
      onChange(dataUrl)
    }
    img.src = url
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="現場写真"
            className="w-full max-h-60 object-contain rounded-lg border border-gray-200"
          />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            const file = e.dataTransfer.files?.[0]
            if (file) handleFile(file)
          }}
        >
          <div className="text-4xl mb-2">📷</div>
          <p className="text-sm text-gray-600 font-medium">写真を撮影 / 選択</p>
          <p className="text-xs text-gray-400 mt-1">タップしてカメラを起動（またはファイルを選択）</p>
        </div>
      )}
    </div>
  )
}
