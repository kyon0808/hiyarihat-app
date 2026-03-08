import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="text-7xl">⛑️</div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ヒヤリハット報告書</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            あなたの「気づき」が職場を守ります。<br />
            写真と音声で、かんたんに報告書を作成できます。
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-left space-y-3">
          {[
            { icon: '📷', text: '写真＋音声でかんたん入力' },
            { icon: '🔍', text: 'なぜなぜ分析で真因を発見' },
            { icon: '📄', text: 'ワンクリックでPDF出力' },
            { icon: '🔒', text: 'データは端末内のみ（サーバー送信なし）' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>

        <Link
          href="/report"
          className="block w-full py-5 bg-blue-600 text-white font-bold text-lg rounded-2xl hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md"
        >
          報告書を作成する →
        </Link>

        <p className="text-xs text-gray-400">
          入力内容はブラウザ内にのみ保存されます。外部サーバーへの送信は行いません。
        </p>
      </div>
    </main>
  )
}
