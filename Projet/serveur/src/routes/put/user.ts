import { Request, Response, Router } from 'express'
import { prisma } from '../../lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { updateProfileSchema } from '../../types/profile.schema'
import { z } from 'zod'

const router = Router()

// @ts-expect-error - overload
router.put('/:id', async (req: Request, res: Response) => {
  try {
    // Mise à jour de l'utilisateur
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        roleId: Number(req.body.roleId),
      },
    })

    res.status(200).json({
      success: true,
      data: user,
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

// @ts-expect-error - overload
router.put('/profile/:id', async (req: Request, res: Response) => {
  const idValid = z.coerce.number().int().safeParse(req.params.id)

  if (!idValid.success) {
    return res.status(400).json({
      success: false,
      message: 'ID invalid',
    })
  }

  const id = idValid.data

  try {
    const input = updateProfileSchema.safeParse(req.body)
    if (!input.success) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
      })
    }

    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Utilisateur non trouvé',
      })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: input.data,
    })

    return res.status(200).json({
      success: true,
      message: 'Profile mis à jour',
      data: updatedUser,
    })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
