import { Request, Response, Router } from 'express'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

const router = Router()

// @ts-expect-error - overload
router.delete('/:id', async (req: Request, res: Response) => {
  const idValid = z.coerce.number().int().safeParse(req.params.id)

  if (!idValid.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID',
    })
  }

  const id = idValid.data

  try {
    const mission = await prisma.mission.findUnique({
      where: { id },
    })

    if (!mission) {
      return res.status(400).json({
        success: false,
        message: "La mission n'existe pas",
      })
    }

    await prisma.mission.delete({
      where: { id },
    })

    return res.status(200).json({
      success: true,
      message: 'Mission supprimée avec succès',
    })
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
