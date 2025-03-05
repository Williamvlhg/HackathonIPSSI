import { z } from 'zod'

export const updateEmployeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  roleId: z.string(),
  skills: z.array(z.object({ id: z.number(), label: z.string() })).nullable(),
})
