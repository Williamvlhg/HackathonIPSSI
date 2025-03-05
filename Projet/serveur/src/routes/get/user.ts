import { Router, Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

const router = Router()

router.get('/all', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        roleId: true,
        role: true,
        worker: {
          select: {
            id: true,
            skills: true,
          },
        },
      },
    })

    res.status(user ? 200 : 404).json({
      success: !!user,
      data: user ? user : 'unknow user',
    })
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: await prisma.user.findUnique({
        where: {
          id: Number(req.params.id),
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          roleId: true,
          role: true,
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
