import { Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import { skillSchema } from "../../types/skill.schema";

const router = Router();

// @ts-expect-error - overload
router.post("/create", async (req: Request, res: Response) => {
  const { success, data: input } = skillSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  const skill = await prisma.skills.create({
    data: {
      label: input.label,
    },
  });

  if (!skill) {
    return res.status(400).json({
      success: false,
      message: "Erreur lors de la création du skill",
    });
  }

  res.status(200).json({ success: true, message: "Compétence créée" });
});

export default router;
