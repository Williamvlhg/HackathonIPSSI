import { z } from 'zod'

export const missionSchema = z.object({
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  workerId: z.number(),
  siteId: z.number(),
})
