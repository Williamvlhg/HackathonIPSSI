import { Request, Response, Router } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

router.get('/all', async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: await prisma.role.findMany(),
    })
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
})

export default router
