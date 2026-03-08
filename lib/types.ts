export type ReportStep = 1 | 2 | 3

export interface WhyEntry {
  level: number
  answer: string
}

export interface ReportData {
  incidentSummary: string
  location: string
  incidentDate: string
  imageDataUrl?: string
  temporaryMeasure: string
  whyChain: WhyEntry[]
  rootCause: string
  permanentMeasures: string
  reporterName?: string
}
