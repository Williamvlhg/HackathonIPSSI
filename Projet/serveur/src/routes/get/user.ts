import { Router, Request, Response } from "express";
import {prisma} from "../../lib/prisma";

const router = Router();

router.get("/all", async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            data: await prisma.user.findMany({
                include: {
                    role: true
                }
            })
        })
    } catch (e: any) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            data: await prisma.user.findUnique({
                where: {
                    id: Number(req.params.id)
                },
                include: {
                    role: true
                }
            })
        })
    } catch (e: any) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
});

export default router;
