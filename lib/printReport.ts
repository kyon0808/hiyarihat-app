import { ReportData } from './types'

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('ja-JP', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
}

export function printReport(data: ReportData): void {
  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const whyRows = data.whyChain
    .filter((e) => e.answer.trim())
    .map(
      (e, i) => `
      <tr>
        <td class="why-label">なぜ ${e.level}</td>
        <td>${i > 0 ? '↳ ' : ''}${esc(e.answer)}</td>
      </tr>`
    ).join('')

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>ヒヤリハット報告書</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Noto Sans JP', 'Meiryo', sans-serif;
    font-size: 11pt;
    color: #1a1a1a;
    padding: 20mm 20mm 15mm;
  }
  h1 {
    font-size: 18pt;
    color: #1d4ed8;
    border-bottom: 2px solid #1d4ed8;
    padding-bottom: 6px;
    margin-bottom: 10px;
  }
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 14px;
  }
  .meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px 16px;
    margin-bottom: 16px;
    font-size: 9pt;
  }
  .meta-label { color: #666; font-size: 8pt; margin-bottom: 2px; }
  .meta-value { font-weight: bold; }
  .section { margin-bottom: 14px; }
  .section-title {
    font-size: 10pt;
    font-weight: bold;
    color: #1d4ed8;
    background: #eff6ff;
    border-left: 3px solid #1d4ed8;
    padding: 3px 8px;
    margin-bottom: 6px;
  }
  .section-body { padding: 0 4px; line-height: 1.7; font-size: 10pt; }
  .content-row { display: flex; gap: 16px; }
  .photo { width: 130px; height: 100px; object-fit: cover; border: 1px solid #e5e7eb; border-radius: 3px; flex-shrink: 0; }
  table.why { width: 100%; border-collapse: collapse; font-size: 10pt; }
  table.why td { padding: 4px 6px; vertical-align: top; line-height: 1.6; }
  .why-label { color: #1d4ed8; font-weight: bold; white-space: nowrap; width: 50px; }
  .root-cause {
    background: #fef9c3;
    border: 1px solid #f59e0b;
    border-radius: 3px;
    padding: 4px 8px;
    margin-top: 6px;
    font-size: 9pt;
  }
  .root-cause-label { color: #92400e; font-weight: bold; font-size: 8pt; }
  .footer {
    position: fixed;
    bottom: 10mm;
    left: 20mm;
    right: 20mm;
    border-top: 1px solid #e5e7eb;
    padding-top: 4px;
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    color: #9ca3af;
  }
  @media print {
    body { padding: 10mm 15mm; }
    .footer { position: fixed; }
  }
</style>
</head>
<body>
<div class="header-row">
  <h1>ヒヤリハット報告書</h1>
  <span style="font-size:9pt;color:#666">作成日: ${today}</span>
</div>

<div class="meta-grid">
  <div><div class="meta-label">発生場所</div><div class="meta-value">${esc(data.location || '－')}</div></div>
  <div><div class="meta-label">発生日時</div><div class="meta-value">${esc(data.incidentDate ? formatDate(data.incidentDate) : '－')}</div></div>
  <div><div class="meta-label">報告者</div><div class="meta-value">${esc(data.reporterName || '（匿名）')}</div></div>
</div>

<div class="section">
  <div class="section-title">【1】事象の概要</div>
  <div class="content-row">
    <div class="section-body" style="flex:1">${esc(data.incidentSummary)}</div>
    ${data.imageDataUrl ? `<img class="photo" src="${data.imageDataUrl}" alt="現場写真">` : ''}
  </div>
</div>

<div class="section">
  <div class="section-title">【2】暫定対策</div>
  <div class="section-body">${esc(data.temporaryMeasure || '（記載なし）')}</div>
</div>

<div class="section">
  <div class="section-title">【3】なぜなぜ分析</div>
  <table class="why">
    <tbody>
      ${whyRows}
    </tbody>
  </table>
  ${data.rootCause ? `
  <div class="root-cause">
    <div class="root-cause-label">根本原因</div>
    ${esc(data.rootCause)}
  </div>` : ''}
</div>

<div class="section">
  <div class="section-title">【4】恒久対策</div>
  <div class="section-body">${esc(data.permanentMeasures || '（記載なし）')}</div>
</div>

<div class="footer">
  <span>ヒヤリハット報告書システム</span>
  <span>${today}</span>
</div>

<script>
  window.onload = function() { window.print(); };
</script>
</body>
</html>`

  const win = window.open('', '_blank')
  if (win) {
    win.document.write(html)
    win.document.close()
  }
}
