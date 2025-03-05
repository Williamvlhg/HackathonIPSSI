import { Request, Response, Router } from 'express'
import { siteSchema } from '../../types/site.schema'
import { prisma } from '../../lib/prisma'
import { Prisma } from '@prisma/client'

const router = Router()

// @ts-expect-error - overload
router.post('/create', async (req: Request, res: Response) => {
  const { success, data: input } = siteSchema.safeParse(req.body)

  if (!success) {
    return res.status(400).json({ success: false, message: 'Données invalides' })
  }
  try {
    // vérification des workers si ils existent
    const workersExist = await prisma.worker.findMany({
      where: { id: { in: input.workers.map((w) => w.id) } },
    })

    if (workersExist.length !== input.workers.length) {
      return res.status(400).json({ success: false, message: "Certains workers n'existe pas" })
    }

    // Vérification des skills
    const skillsExist = await prisma.skill.findMany({
      where: { id: { in: input.skills.map((s) => s.id) } },
    })

    if (skillsExist.length !== input.skills.length) {
      return res
        .status(400)
        .json({ success: false, message: "Certaines compétences n'existent pas." })
    }

    const site = await prisma.site.create({
      data: {
        address: input.address,
        name: input.name,
        startDate: input.startDate,
        endDate: input.endDate,
        workers: {
          connect: workersExist.map((worker) => ({ id: worker.id })),
        },
        skills: {
          connect: skillsExist.map((skill) => ({ id: skill.id })),
        },
      },
    })

    if (!site) {
      return res.status(400).json({
        success: false,
        message: 'Erreur lors de la création du site',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Site créé avec succès',
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Erreur de requête Prisma:', error)
      return res.status(400).json({
        success: false,
        message: `Erreur de requête Prisma: ${error}`,
      })
    } else {
      console.error('Erreur inconnue:', error)
      return res.status(500).json({
        success: false,
        message: 'Une erreur interne est survenue.',
      })
    }
  }
})

export default router
