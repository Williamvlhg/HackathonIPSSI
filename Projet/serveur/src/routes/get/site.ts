import { Router, Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

const router = Router()

router.get('/all', async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: await prisma.site.findMany({
        include: {
          workers: {
            include: {
              skills: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          skills: {
            select: {
              id: true,
              label: true,
            },
          },
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

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const site = await prisma.site.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        workers: true,
        skills: true,
      },
    })

    res.status(site ? 200 : 404).json({
      success: !!site,
      data: site ? site : 'unknow site',
    })
  } catch (e: any) {
    const idValid = z.coerce.number().int().safeParse(req.params.id)

    if (idValid) {
      res.status(400).json({
        success: false,
        message: 'ID Inconnu',
      })
    }
  }
})

export default router
