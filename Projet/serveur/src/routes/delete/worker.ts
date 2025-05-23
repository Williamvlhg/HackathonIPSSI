import { Router, Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: await prisma.worker.delete({
        where: {
          id: Number(req.params.id),
        },
      }),
    })
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
