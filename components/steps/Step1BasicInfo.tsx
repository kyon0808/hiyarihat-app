'use client'

import { ReportData } from '@/lib/types'
import ImageUpload from '@/components/ImageUpload'
import VoiceInput from '@/components/VoiceInput'

interface Props {
  data: ReportData
  onChange: (data: Partial<ReportData>) => void
  onNext: () => void
}

export default function Step1BasicInfo({ data, onChange, onNext }: Props) {
  const isValid = data.incidentSummary.trim() && data.location.trim() && data.incidentDate

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">基本情報の入力</h2>
        <p className="text-sm text-gray-500">何が起きたか、どこで、いつ起きたかを記録します。</p>
      </div>

      {/* 写真 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          現場の写真（任意）
        </label>
        <ImageUpload
          value={data.imageDataUrl}
          onChange={(v) => onChange({ imageDataUrl: v })}
        />
      </div>

      {/* 事象の概要 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          事象の概要 <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 items-start">
          <textarea
            value={data.incidentSummary}
            onChange={(e) => onChange({ incidentSummary: e.target.value })}
            placeholder="例：配管継手の増し締め作業中に、スパナが滑って手をぶつけそうになった"
            rows={3}
            className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <VoiceInput
            onResult={(text) =>
              onChange({ incidentSummary: data.incidentSummary ? data.incidentSummary + ' ' + text : text })
            }
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">マイクボタンで音声入力もできます</p>
      </div>

      {/* 発生場所 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          発生場所 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="例：第3工場 2階 配管エリア"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 発生日時 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          発生日時 <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          value={data.incidentDate}
          onChange={(e) => onChange({ incidentDate: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 報告者名 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          報告者名（任意）
        </label>
        <input
          type="text"
          value={data.reporterName || ''}
          onChange={(e) => onChange({ reporterName: e.target.value })}
          placeholder="氏名または匿名"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onNext}
        disabled={!isValid}
        className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl text-base disabled:bg-gray-200 disabled:text-gray-400 hover:bg-blue-700 transition-colors"
      >
        次へ：なぜなぜ分析 →
      </button>
    </div>
  )
}
