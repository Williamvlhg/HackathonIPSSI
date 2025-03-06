import { Request, Response, Router } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

router.get('/all', async (req: Request, res: Response) => {
  try {
    const missions = await prisma.mission.findMany()

    res.status(200).json({
      success: true,
      data: missions,
    })
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

// @ts-expect-error - overload
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Paramètre d'url invalide",
    })
  }

  try {
    const mission = await prisma.mission.findUnique({
      where: {
        id,
      },
    })

    res.status(mission ? 200 : 404).json({
      success: !!mission,
      data: mission ? mission : 'Mission introvable',
    })
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
