import { Request, Response, Router } from 'express'
import { prisma } from '../../lib/prisma'

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

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
})

export default router
