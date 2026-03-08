'use client'

import { ReportData } from '@/lib/types'
import WhyChainEditor from '@/components/WhyChainEditor'
import VoiceInput from '@/components/VoiceInput'

interface Props {
  data: ReportData
  onChange: (data: Partial<ReportData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step2WhyWhy({ data, onChange, onNext, onBack }: Props) {
  const hasWhyAnswers = data.whyChain.some((e) => e.answer.trim())

  // 最後の「なぜ」の回答を根本原因に自動反映
  const handleWhyChange = (entries: typeof data.whyChain) => {
    const lastAnswer = [...entries].reverse().find((e) => e.answer.trim())?.answer || ''
    onChange({ whyChain: entries, rootCause: lastAnswer })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">なぜなぜ分析</h2>
        <p className="text-sm text-gray-500">
          事象の根本原因を探ります。「なぜ起きたか」を繰り返し問いかけ、真因に辿り着きましょう。
        </p>
      </div>

      {/* 事象の概要（読み取り専用で表示） */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-600 font-semibold mb-1">対象の事象</p>
        <p className="text-sm text-gray-800">{data.incidentSummary}</p>
      </div>

      {/* なぜなぜ分析 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          なぜなぜ分析（最低1段、最大5段）
        </label>
        <WhyChainEditor entries={data.whyChain} onChange={handleWhyChange} />
      </div>

      {/* 根本原因 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          根本原因
          <span className="text-xs font-normal text-gray-400 ml-2">（最後の「なぜ」から自動入力・編集可）</span>
        </label>
        <textarea
          value={data.rootCause}
          onChange={(e) => onChange({ rootCause: e.target.value })}
          placeholder="分析の結果たどり着いた根本原因を記入します"
          rows={2}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* 暫定対策 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          暫定対策（その場でとった対処）
        </label>
        <div className="flex gap-2 items-start">
          <textarea
            value={data.temporaryMeasure}
            onChange={(e) => onChange({ temporaryMeasure: e.target.value })}
            placeholder="例：濡れた床に立入禁止テープを貼り、清掃を依頼した"
            rows={2}
            className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <VoiceInput
            onResult={(text) =>
              onChange({ temporaryMeasure: data.temporaryMeasure ? data.temporaryMeasure + ' ' + text : text })
            }
          />
        </div>
      </div>

      {/* 恒久対策 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          恒久対策（再発防止のためのアイデア）
        </label>
        <div className="flex gap-2 items-start">
          <textarea
            value={data.permanentMeasures}
            onChange={(e) => onChange({ permanentMeasures: e.target.value })}
            placeholder="例：清掃手順書に「水拭き後の乾燥確認」を追加する。乾燥前は黄色マットを置くルールを設ける"
            rows={3}
            className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <VoiceInput
            onResult={(text) =>
              onChange({ permanentMeasures: data.permanentMeasures ? data.permanentMeasures + ' ' + text : text })
            }
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
        >
          ← 戻る
        </button>
        <button
          onClick={onNext}
          disabled={!hasWhyAnswers}
          className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-xl text-base disabled:bg-gray-200 disabled:text-gray-400 hover:bg-blue-700 transition-colors"
        >
          次へ：確認・出力 →
        </button>
      </div>
    </div>
  )
}
