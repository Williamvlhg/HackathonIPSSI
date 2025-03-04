import { Request, Response, Router } from "express";
import { siteSchema } from "../../types/site.schema";

const router = Router();

// @ts-expect-error - overload
router.post("/create", (req: Request, res: Response) => {
  const { success, data } = siteSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: "Invalid data" });
  }

  console.log(data);

  res.status(200).json({ message: "site" });
});

export default router;
