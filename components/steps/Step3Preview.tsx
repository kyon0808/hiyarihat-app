'use client'

import { ReportData } from '@/lib/types'
import { printReport } from '@/lib/printReport'

interface Props {
  data: ReportData
  onChange: (data: Partial<ReportData>) => void
  onBack: () => void
  onSubmit: () => void
}

function Field({ label, value, onEdit }: { label: string; value: string; onEdit: (v: string) => void }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onEdit(e.target.value)}
        rows={2}
        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-gray-50"
      />
    </div>
  )
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('ja-JP')
  } catch {
    return iso
  }
}

export default function Step3Preview({ data, onChange, onBack, onSubmit }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">確認・出力</h2>
        <p className="text-sm text-gray-500">内容を確認し、必要に応じて編集してからPDFを出力してください。</p>
      </div>

      {/* プレビューカード */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center border-b border-blue-100 pb-2 mb-3">
          <h3 className="font-bold text-blue-700">ヒヤリハット報告書</h3>
          <span className="text-xs text-gray-400">{new Date().toLocaleDateString('ja-JP')}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div><span className="text-gray-400">発生場所：</span><span className="font-semibold">{data.location}</span></div>
          <div><span className="text-gray-400">発生日時：</span><span className="font-semibold">{formatDate(data.incidentDate)}</span></div>
          {data.reporterName && <div><span className="text-gray-400">報告者：</span><span className="font-semibold">{data.reporterName}</span></div>}
        </div>

        {data.imageDataUrl && (
          <img src={data.imageDataUrl} alt="現場写真" className="w-full max-h-40 object-contain rounded border border-gray-100 mb-3" />
        )}

        <div className="space-y-3 text-sm">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs font-bold text-blue-700 mb-1">【1】事象の概要</p>
            <p className="text-gray-800 whitespace-pre-wrap">{data.incidentSummary}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-600 mb-1">【2】暫定対策</p>
            <p className="text-gray-800 whitespace-pre-wrap">{data.temporaryMeasure || '－'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-600 mb-2">【3】なぜなぜ分析</p>
            <div className="space-y-1">
              {data.whyChain.filter(e => e.answer.trim()).map((e, i) => (
                <div key={i} className="flex gap-2 text-xs">
                  <span className="text-blue-600 font-bold w-10 flex-shrink-0">なぜ{e.level}：</span>
                  <span className="text-gray-700">{i > 0 ? '↳ ' : ''}{e.answer}</span>
                </div>
              ))}
              {data.rootCause && (
                <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded p-2">
                  <span className="text-xs font-bold text-yellow-700">根本原因：</span>
                  <span className="text-xs text-gray-800">{data.rootCause}</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs font-bold text-green-700 mb-1">【4】恒久対策</p>
            <p className="text-gray-800 whitespace-pre-wrap">{data.permanentMeasures || '－'}</p>
          </div>
        </div>
      </div>

      {/* 編集エリア */}
      <details className="border border-gray-200 rounded-xl">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-xl">
          内容を編集する ▼
        </summary>
        <div className="px-4 pb-4 pt-2">
          <Field label="事象の概要" value={data.incidentSummary} onEdit={(v) => onChange({ incidentSummary: v })} />
          <Field label="暫定対策" value={data.temporaryMeasure} onEdit={(v) => onChange({ temporaryMeasure: v })} />
          <Field label="根本原因" value={data.rootCause} onEdit={(v) => onChange({ rootCause: v })} />
          <Field label="恒久対策" value={data.permanentMeasures} onEdit={(v) => onChange({ permanentMeasures: v })} />
        </div>
      </details>

      {/* ボタン群 */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
        >
          ← 戻る
        </button>
        <button
          onClick={() => printReport(data)}
          className="flex-[2] py-4 bg-green-600 text-white font-bold rounded-xl text-base hover:bg-green-700 transition-colors"
        >
          PDFを印刷・保存
        </button>
      </div>

      <p className="text-xs text-center text-gray-400">
        印刷ダイアログで「PDFに保存」を選択するとPDF出力できます
      </p>

      <button
        onClick={onSubmit}
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
      >
        提出する（完了）
      </button>
    </div>
  )
}
