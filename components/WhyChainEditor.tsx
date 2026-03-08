'use client'

import { WhyEntry } from '@/lib/types'

interface Props {
  entries: WhyEntry[]
  onChange: (entries: WhyEntry[]) => void
}

export default function WhyChainEditor({ entries, onChange }: Props) {
  const update = (index: number, answer: string) => {
    const next = entries.map((e, i) => (i === index ? { ...e, answer } : e))
    onChange(next)
  }

  const add = () => {
    if (entries.length >= 5) return
    onChange([...entries, { level: entries.length + 1, answer: '' }])
  }

  const remove = (index: number) => {
    if (entries.length <= 1) return
    onChange(
      entries
        .filter((_, i) => i !== index)
        .map((e, i) => ({ ...e, level: i + 1 }))
    )
  }

  return (
    <div className="space-y-3">
      {entries.map((entry, i) => (
        <div key={i} className="relative">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-16 pt-3">
              <span className="text-sm font-bold text-blue-600">なぜ {entry.level}</span>
            </div>
            <div className="flex-1">
              <textarea
                value={entry.answer}
                onChange={(e) => update(i, e.target.value)}
                placeholder={
                  i === 0
                    ? 'なぜそのことが起きたのでしょうか？'
                    : `「なぜ${entry.level - 1}」の原因は、なぜ起きたのでしょうか？`
                }
                rows={2}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            {entries.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="flex-shrink-0 mt-2 w-7 h-7 rounded-full bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500 text-xs flex items-center justify-center"
                title="この段を削除"
              >
                ✕
              </button>
            )}
          </div>
          {i < entries.length - 1 && (
            <div className="ml-8 text-gray-300 text-lg leading-none py-0.5 select-none">↓</div>
          )}
        </div>
      ))}

      {entries.length < 5 && (
        <button
          type="button"
          onClick={add}
          className="ml-16 text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
        >
          <span className="text-lg leading-none">＋</span> なぜを追加（最大5段）
        </button>
      )}
    </div>
  )
}
