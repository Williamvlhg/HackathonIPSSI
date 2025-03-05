import { Router, Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

const router = Router();

router.get("/all", async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: await prisma.worker.findMany({
        include: {
          skills: true,
		  missions: true,
          user: {
            select: {
              id: true,
              lastName: true,
              firstName: true,
              email: true,
              role: true,
            },
          }
        },
      }),
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const worker = await prisma.worker.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        skills: true,
	    missions: true,
        user: {
          select: {
            id: true,
            lastName: true,
            firstName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    res.status(worker ? 200 : 404).json({
      success: !!worker,
      data: worker ? worker : "unknow worker",
    });
  } catch (e: any) {
    const idValid = z.coerce.number().int().safeParse(req.params.id);

    if (idValid) {
      res.status(400).json({
        success: false,
        message: "invalid id",
      });
    }
  }
});

export default router;
