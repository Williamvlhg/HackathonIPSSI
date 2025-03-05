import { Router, Request, Response } from "express";
import {prisma} from "../../lib/prisma";
import {z} from "zod";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

const router = Router();

// @ts-ignore
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const skill = await prisma.skill.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                label: req.body.label
            }
        })

        res.status(200).json({
            success: true,
            data: skill
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

export default router;
