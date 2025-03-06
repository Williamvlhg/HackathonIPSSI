import { Router, Request, Response } from 'express'
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
    const skill = await prisma.skill.findUnique({
      where: { id },
    })

    if (!skill) {
      return res.status(400).json({
        success: false,
        message: "La compétence n'existe pas",
      })
    }

    await prisma.skill.delete({
      where: { id },
    })

    return res.status(200).json({
      success: true,
      message: 'Compétence supprimée avec succès',
    })
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
