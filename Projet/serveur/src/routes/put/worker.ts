import { Request, Response, Router } from 'express'
import { prisma } from '../../lib/prisma'
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

const router = Router()

// @ts-expect-error - overload
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const currentWorker = await prisma.worker.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        skills: true,
      },
    })

    if (!currentWorker) {
      return res.status(404).json({
        success: false,
        message: 'Ouvrier inconnu',
      })
    }

    const currentSkills = currentWorker.skills.map((skill) => skill.id)
    const newSkills = req.body.skills.map((skill: { id: number; label: string }) => skill.id)
    const skillsToDisconnect = currentSkills.filter((skillId) => !newSkills.includes(skillId))
    const skillsToConnect = newSkills.filter((skillId: number) => !currentSkills.includes(skillId))

    // Mise à jour des compétences du worker
    await prisma.worker.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        skills: {
          // Déconnecter les compétences qui ne sont plus dans la nouvelle liste
          disconnect: skillsToDisconnect.map((id) => ({ id })),
          // Connecter les nouvelles compétences
          connect: skillsToConnect.map((id: number) => ({ id })),
        },
      },
    })

    res.status(200).json({
      success: true,
      message: 'Compétences mises à jour',
    })
  } catch (e: any) {
	  if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
		  return res.status(404).json({
			  success: false,
			  message: 'ID Inconnu'
		  });
	  }

	  res.status(500).json({
		  success: false,
		  message: e.message
	  });
  }
})

export default router
