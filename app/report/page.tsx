'use client'

import { useState } from 'react'
import { ReportData, ReportStep } from '@/lib/types'
import ProgressSteps from '@/components/ProgressSteps'
import Step1BasicInfo from '@/components/steps/Step1BasicInfo'
import Step2WhyWhy from '@/components/steps/Step2WhyWhy'
import Step3Preview from '@/components/steps/Step3Preview'

const now = new Date()
const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 16)

const initialData: ReportData = {
  incidentSummary: '',
  location: '',
  incidentDate: localIso,
  imageDataUrl: undefined,
  temporaryMeasure: '',
  whyChain: [
    { level: 1, answer: '' },
    { level: 2, answer: '' },
    { level: 3, answer: '' },
  ],
  rootCause: '',
  permanentMeasures: '',
  reporterName: '',
}

export default function ReportPage() {
  const [step, setStep] = useState<ReportStep>(1)
  const [data, setData] = useState<ReportData>(initialData)
  const [submitted, setSubmitted] = useState(false)

  const update = (partial: Partial<ReportData>) => {
    setData((prev) => ({ ...prev, ...partial }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">報告書を提出しました</h2>
          <p className="text-sm text-gray-500 mb-6">
            ご報告ありがとうございます。あなたの気づきが職場の安全を守ります。
          </p>
          <button
            onClick={() => { setData(initialData); setStep(1); setSubmitted(false) }}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            新しい報告書を作成
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-gray-800">ヒヤリハット報告書</h1>
          <p className="text-xs text-gray-400 mt-1">気づきが職場を守ります</p>
        </div>

        <ProgressSteps current={step} />

        <div className="bg-white rounded-2xl shadow-sm p-5">
          {step === 1 && (
            <Step1BasicInfo
              data={data}
              onChange={update}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2WhyWhy
              data={data}
              onChange={update}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <Step3Preview
              data={data}
              onChange={update}
              onBack={() => setStep(2)}
              onSubmit={() => setSubmitted(true)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
