import { Router, Request, Response } from "express";
import {prisma} from "../../lib/prisma";
import {z} from "zod";

const router = Router();

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const site = await prisma.site.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                address: req.body.address,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            }
        })

        res.status(site ? 200 : 404).json({
            success: !!site,
            data: site ? site : 'unknow id'
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
