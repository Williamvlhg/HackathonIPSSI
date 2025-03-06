import { Request, Response, Router } from 'express'
import { prisma } from '../../lib/prisma'
import { missionSchema } from '../../types/mission.schema'

const router = Router()

// @ts-expect-error - overload
router.post('/create', async (req: Request, res: Response) => {
  const { success, data: input } = missionSchema.safeParse(req.body)

  if (!success) {
    return res.status(400).json({ success: false, message: 'Données invalides' })
  }

  try {
    // Vérification simultanée du worker et du site
    const [worker, site] = await Promise.all([
      prisma.worker.findUnique({ where: { id: input.workerId } }),
      prisma.site.findUnique({ where: { id: input.siteId } }),
    ])

    if (!worker || !site) {
      return res.status(400).json({
        success: false,
        message: !worker ? 'Worker inexistant' : 'Chantier inexistant',
      })
    }

    await prisma.mission.create({
      data: {
        title: input.title,
        startDate: input.startDate,
        endDate: input.endDate,
        workerId: input.workerId,
        siteId: input.siteId,
      },
    })

    return res.status(200).json({
      success: true,
      message: 'Mission créée avec succès',
    })
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
    })
  }
})

export default router
