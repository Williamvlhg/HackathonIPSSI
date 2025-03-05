import { Router, Request, Response } from "express";
import {prisma} from "../../lib/prisma";
import {z} from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const router = Router();

// @ts-ignore
router.put('/:id', async (req: Request, res: Response) => {
	try {
		const mission = await prisma.mission.update({
			where: {
				id: Number(req.params.id)
			},
			data: {
				title: req.body.title,
				startDate: req.body.startDate,
				endDate: req.body.endDate,
				workerId: Number(req.body.workerId),
				siteId: Number(req.body.siteId)
			}
		})

		res.status(200).json({
			success: true,
			data: mission
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
