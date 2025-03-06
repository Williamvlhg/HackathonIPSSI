import { Request, Response, Router } from "express";
import { missionSchema } from "../../types/mission.schema";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

const router = Router();

// @ts-expect-error - overload
router.post("/create", async (req: Request, res: Response) => {
	const { success, data: input } = missionSchema.safeParse(req.body);

	if (!success) {
		return res.status(400).json({ success: false, message: "Données invalides" });
	}
	try {
		const mission = await prisma.mission.create({
			data: {
				title: input.title,
				startDate: input.startDate,
				endDate: input.endDate,
				workerId: input.workerId,
				siteId: input.siteId
			},
		});

		if (!mission) {
			return res.status(400).json({
				success: false,
				message: "Erreur lors de la création de la mission",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Mission créée avec succès",
		});
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error(error);
			return res.status(400).json({
				success: false,
				message: "Données invalides",
			});
		}
	}
});

export default router;
