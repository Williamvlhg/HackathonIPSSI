import { Router, Request, Response } from "express";
import {prisma} from "../../lib/prisma";
import {z} from "zod";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

const router = Router();

// @ts-ignore
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const site = await prisma.site.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                address: req.body.address,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            }
        })

        res.status(200).json({
            success: true,
            data: site
        })
    } catch (e: any) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
			return res.status(404).json({
				success: false,
				message: 'invalid id'
			});
		}

		res.status(500).json({
			success: false,
			message: e.message
		});
    }
})

export default router;
