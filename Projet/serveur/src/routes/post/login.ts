import { Router, Request, Response } from "express";
import { loginSchema } from "../../types/login.schema";

const router = Router();

// @ts-expect-error - overload
router.post("/", (req: Request, res: Response) => {
  const { success, data } = loginSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: "Invalid data" });
  }

  console.log(data);

  res.status(200).json({ message: "Login" });
});

export default router;
