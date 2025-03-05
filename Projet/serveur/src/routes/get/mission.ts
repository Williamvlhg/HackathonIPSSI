import { Router, Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

const router = Router();

router.get('/all', async (req: Request, res: Response) => {
	try {
		const missions = await prisma.mission.findMany()

		res.status(200).json({
			success: true,
			data: missions
		})
	} catch (e: any) {
		res.status(500).json({
			success: false,
			message: e.message
		})
	}
})

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const mission = await prisma.mission.findUnique({
			where: {
				id: Number(req.params.id)
			}
		})

		res.status(mission ? 200 : 404).json({
			success: !!mission,
			data: mission ? mission : 'ID inconnu'
		})
	} catch (e: any) {
		res.status(500).json({
			success: false,
			message: e.message
		})
	}
})

export default router;
