import { Router, Request, Response } from "express";
import {prisma} from "../../lib/prisma";
import {z} from "zod";

const router = Router();

router.put('/:id', async (req: Request, res: Response) => {

    const skills = [
        {
            id: 4,
            label: "Electricien"
        },
        {
            id: 5,
            label: "Maçon"
        },
        {
            id: 6,
            label: "Plaquiste"
        }
    ]

    try {

        const workerId = Number(req.params.id);
        const { skills }: { skills: { id: number; label: string }[] } = req.body;

        const worker = await prisma.worker.findUnique({
            where: { id: workerId },
        });

        await Promise.all(
            skills.map(async (skill) => {
                await prisma.skills.create({
                    data: {

                    }
                })
            })
        );



        res.json({ message: "Worker ajouté aux skills avec succès." });

    } catch (e: any) {
        const idValid = z.coerce.number().int().safeParse(req.params.id);

        if(idValid) {
            res.status(400).json({
                success: false,
                message: "invalid id"
            })
        }
    }
})

export default router;
