import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Request, Response, Router } from 'express'
import { prisma } from '../../lib/prisma'
import { missionSchema } from '../../types/mission.schema'
import { z } from 'zod'

const router = Router()

// @ts-expect-error - overload
router.put('/:id', async (req: Request, res: Response) => {
  const idValid = z.coerce.number().int().safeParse(req.params.id)

  if (!idValid.success) {
    return res.status(400).json({ success: false, message: 'Invalid ID' })
  }

  const id = idValid.data

  const { success, data: input } = missionSchema.safeParse(req.body)

  if (!success) {
    return res.status(400).json({ success: false, message: 'Données invalides' })
  }

  try {
    const mission = await prisma.mission.findUnique({
      where: { id },
    })

    if (!mission) {
      return res.status(400).json({
        success: false,
        message: 'Mission non trouvée',
      })
    }

    const worker = await prisma.worker.findUnique({
      where: { id: input.workerId },
    })

    if (!worker) {
      return res.status(400).json({
        success: false,
        message: 'Worker non trouvé',
      })
    }

    const site = await prisma.site.findUnique({
      where: { id: input.siteId },
    })

    if (!site) {
      return res.status(400).json({
        success: false,
        message: 'Site non trouvé',
      })
    }

    const updatedMission = await prisma.mission.update({
      where: {
        id,
      },
      data: {
        title: input.title,
        startDate: input.startDate,
        endDate: input.endDate,
        workerId: input.workerId,
        siteId: input.siteId,
      },
    })

    res.status(200).json({
      success: true,
      data: updatedMission,
    })
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'ID Inconnu',
      })
    }

    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
