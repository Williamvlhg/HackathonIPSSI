import { Router, Request, Response } from 'express'
import { registerSchema } from '../../types/register.schema'
import { prisma } from '../../lib/prisma'

const router = Router()

// @ts-expect-error - overload
router.post('/', async (req: Request, res: Response) => {
  const { success, data: input } = registerSchema.safeParse(req.body)

  if (!success || !input) {
    return res.status(400).json({ success: false, message: 'Données invalides' })
  }

  const users = await prisma.user.findMany()

  const isUserExist = users.some((user) => user.email === input.email)
  if (isUserExist) {
    return res.status(400).json({ success: false, message: "L'email existe déjà" })
  }

  const user = await prisma.user.create({
    data: {
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      password: input.password,
      role: {
        connectOrCreate: {
          where: { id: input.roleId },
          create: { id: input.roleId, label: 'admin' },
        },
      },
    },
    select: {
      id: true,
      role: true,
    },
  })

  if (user.role.label === 'worker') {
    await prisma.worker.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })
  }

  let workerRole = await prisma.role.findUnique({
    where: { label: 'worker' },
  })

  if (!workerRole) {
    workerRole = await prisma.role.create({
      data: { label: 'worker' },
    })
  }

  if (!user) {
    return res.status(400).json({ success: false, message: 'Une erreur est survenue' })
  }

  res.status(200).json({ success: true, message: 'Vous avez créer un compte' })
})

export default router
