import { z } from 'zod'

export const updateProfileSchema = z.object({
  id: z.number(),
  password: z.string(),
  email: z.string().email(),
})
