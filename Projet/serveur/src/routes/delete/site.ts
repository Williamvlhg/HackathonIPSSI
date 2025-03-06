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
    const site = await prisma.site.findUnique({
      where: { id },
    })

    if (!site) {
      return res.status(400).json({
        success: false,
        message: "Le site n'existe pas",
      })
    }

    await prisma.site.delete({
      where: { id },
    })

    return res.status(200).json({
      success: true,
      message: 'Site supprimé avec succès',
    })
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
