import { z } from 'zod'

export const addEmployeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  roleId: z.string(),
})
