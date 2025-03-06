import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Request, Response, Router } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

// @ts-ignore
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const currentSite = await prisma.site.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        skills: true,
        workers: true,
      },
    })

    if (!currentSite) {
      return res.status(404).json({
        success: false,
        message: 'Site inconnu',
      })
    }

    const currentSkills = currentSite.skills.map((skill) => skill.id)
    const newSkills = req.body.skills.map((skill: { id: number; label: string }) => skill.id)
    const skillsToDisconnect = currentSkills.filter((skillId) => !newSkills.includes(skillId))
    const skillsToConnect = newSkills.filter((skillId: number) => !currentSkills.includes(skillId))

    const currentWorkers = currentSite.workers.map((worker) => worker.id)
    const newWorkers = req.body.workers.map((worker: { id: number; label: string }) => worker.id)
    const workersToDisconnect = currentWorkers.filter((workerId) => !newWorkers.includes(workerId))
    const workersToConnect = newWorkers.filter(
      (workerId: number) => !currentWorkers.includes(workerId)
    )

    const site = await prisma.site.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        address: req.body.address,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        skills: {
          disconnect: skillsToDisconnect.map((id) => ({ id })),
          connect: skillsToConnect.map((id: number) => ({ id })),
        },
        workers: {
          disconnect: workersToDisconnect.map((id) => ({ id })),
          connect: workersToConnect.map((id: number) => ({ id })),
        },
      },
    })

    res.status(200).json({
      success: true,
      data: site,
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
