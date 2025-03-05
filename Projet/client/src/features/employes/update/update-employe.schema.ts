import { z } from 'zod'

export const updateEmployeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  roleId: z.string(),
})
