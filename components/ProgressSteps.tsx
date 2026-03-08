'use client'

import { ReportStep } from '@/lib/types'
import { clsx } from 'clsx'

const STEPS = [
  { num: 1, label: '基本情報' },
  { num: 2, label: 'なぜなぜ分析' },
  { num: 3, label: '確認・出力' },
]

export default function ProgressSteps({ current }: { current: ReportStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2',
                current === step.num
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : current > step.num
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              )}
            >
              {current > step.num ? '✓' : step.num}
            </div>
            <span
              className={clsx(
                'text-xs mt-1 whitespace-nowrap',
                current === step.num ? 'text-blue-600 font-semibold' : 'text-gray-400'
              )}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={clsx(
                'h-0.5 w-12 mx-1 mb-4',
                current > step.num ? 'bg-green-500' : 'bg-gray-200'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
