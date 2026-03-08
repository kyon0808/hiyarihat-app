import { z } from 'zod'

export const WhyEntrySchema = z.object({
  level: z.number().min(1).max(5),
  answer: z.string(),
})

export const ReportDataSchema = z.object({
  incidentSummary: z.string().min(1, '事象の概要を入力してください'),
  location: z.string().min(1, '発生場所を入力してください'),
  incidentDate: z.string().min(1, '発生日時を入力してください'),
  imageDataUrl: z.string().optional(),
  temporaryMeasure: z.string(),
  whyChain: z.array(WhyEntrySchema).min(1),
  rootCause: z.string(),
  permanentMeasures: z.string(),
  reporterName: z.string().optional(),
})
