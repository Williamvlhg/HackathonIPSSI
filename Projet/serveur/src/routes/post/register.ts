import { Router, Request, Response } from "express";
import { registerSchema } from "../../types/register.schema";
import { prisma } from "../../lib/prisma";

const router = Router();

// @ts-expect-error - overload
router.post("/", async (req: Request, res: Response) => {
  const { success, data: input } = registerSchema.safeParse(req.body);

  if (!success || !input) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  const users = await prisma.user.findMany();

  const isUserExist = users.some((user) => user.email === input.email);
  if (isUserExist) {
    return res.status(400).json({ error: true, message: "User already exist" });
  }

  const user = await prisma.user.create({
    data: input,
  });

  if (!user) {
    return res
      .status(400)
      .json({ error: true, message: "Error while creating user" });
  }

  res.status(200).json({ error: false, message: "Vous avez créer un compte" });
});

export default router;
