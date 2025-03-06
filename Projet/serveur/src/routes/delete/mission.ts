import { Router, Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

const router = Router()

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const mission = await prisma.mission.delete({
      where: {
        id: Number(req.params.id),
      },
    })

    res.status(mission ? 200 : 404).json({
      success: !!mission,
      data: mission ? mission : 'ID inconnu',
    })
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
