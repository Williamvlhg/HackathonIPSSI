import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Request, Response, Router } from 'express'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'
import { skillSchema } from '../../types/skill.schema'

const router = Router()

// @ts-ignore
router.put('/:id', async (req: Request, res: Response) => {
  const idValid = z.coerce.number().int().safeParse(req.params.id)

  if (!idValid.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID',
    })
  }

  const id = idValid.data

  const input = skillSchema.safeParse(req.body)

  if (!input.success) {
    return res.status(400).json({
      success: false,
      message: 'données invalide',
    })
  }

  try {
    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    })

    if (!existingSkill) {
      return res.status(400).json({
        success: false,
        message: 'Compétence non trouvée',
      })
    }

    const skill = await prisma.skill.update({
      where: {
        id,
      },
      data: input.data,
    })

    res.status(200).json({
      success: true,
      data: skill,
    })
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'ID invalide',
      })
    }

    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
