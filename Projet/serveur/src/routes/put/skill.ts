import { Router, Request, Response } from "express";
import {prisma} from "../../lib/prisma";
import {z} from "zod";

const router = Router();

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const skill = await prisma.skill.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                label: req.body.label
            }
        })

        res.status(skill ? 200 : 404).json({
            success: !!skill,
            data: skill ? skill : 'unknow id'
        })


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
