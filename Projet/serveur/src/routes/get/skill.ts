import { Request, Response, Router } from 'express'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

const router = Router()

router.get('/all', async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: await prisma.skill.findMany(),
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
    const skill = await prisma.skill.findUnique({
      where: {
        id: Number(req.params.id),
      },
    })

    res.status(skill ? 200 : 404).json({
      success: !!skill,
      data: skill ? skill : 'Compétence inconnue',
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
