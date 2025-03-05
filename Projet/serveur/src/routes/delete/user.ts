import { Router, Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    // on delete le user
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    })

    // delete le worker si c'est un worker
    if (user.workerId !== null) {
      await prisma.worker.delete({
        where: {
          id: user.workerId,
        },
      })
    }

    res.status(200).json({
      success: true,
      message: "L'utilisateur a été supprimé",
    })
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
