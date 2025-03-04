import { Request, Response, Router } from "express";
import { siteSchema } from "../../types/site.schema";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

const router = Router();

// @ts-expect-error - overload
router.post("/create", async (req: Request, res: Response) => {
  const { success, data: input } = siteSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }
  try {
    const site = await prisma.site.create({
      data: {
        address: input.address,
        name: input.name,
        startDate: input.startDate,
        endDate: input.endDate,
        skills: {
          connect: input.skills.map((skill) => ({
            id: skill.id,
            label: skill.label,
          })),
        },
      },
    });

    if (!site) {
      return res.status(400).json({
        success: false,
        message: "Erreur lors de la création du site",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Site créé avec succès",
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error);
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }
  }
});

export default router;
