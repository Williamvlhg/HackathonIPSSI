import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient()

router.get("/all", async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            data: await prisma.skills.findMany()
        })
    } catch (e: any) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
});

export default router;
