import { Router, Request, Response } from 'express'
import { loginSchema } from '../../types/login.schema'
import { prisma } from '../../lib/prisma'
import bcrypt from 'bcryptjs'

const router = Router()

// @ts-expect-error - overload
router.post('/', async (req: Request, res: Response) => {
  const { success, data } = loginSchema.safeParse(req.body)

  if (!success) {
    return res.status(400).json({ success: false, message: 'Données invalides' })
  }

  const users = await prisma.user.findMany()

  const isUserEmailExist = users.some((user) => user.email === data.email)
  if (!isUserEmailExist) {
    return res.status(400).json({ success: false, message: "L'email n'existe pas" })
  }

  const user = users.find((user) => user.email === data.email)

  const isUserPasswordCorrect = user && (await bcrypt.compare(data.password, user.password))
  if (!isUserPasswordCorrect) {
    return res.status(400).json({ success: false, message: 'Mot de passe incorrect' })
  }

  const userInfo = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      email: true,
      id: true,
      role: {
        select: {
          label: true,
        },
      },
    },
  })

  res.status(200).json({ success: true, message: 'Login', user: userInfo })
})

export default router
