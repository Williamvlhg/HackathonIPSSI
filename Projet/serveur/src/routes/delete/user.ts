import { Router, Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

const router = Router()

// @ts-expect-error - overload
router.delete('/:id', async (req: Request, res: Response) => {
  const idValid = z.coerce.number().int().safeParse(req.params.id)

  if (!idValid.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID',
    })
  }

  const id = idValid.data

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "L'utilisateur n'existe pas",
      })
    }

    await prisma.user.delete({
      where: { id },
    })

    if (user.workerId !== null) {
      await prisma.worker.delete({
        where: { id: user.workerId },
      })
    }

    return res.status(200).json({
      success: true,
      message: "L'utilisateur a été supprimé",
    })
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
