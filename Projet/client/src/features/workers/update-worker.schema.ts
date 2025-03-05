import { z } from 'zod'

export const updateWorkerSchema = z.object({
  workerId: z.number(),
  skills: z.array(z.object({ id: z.number(), label: z.string() })),
})
