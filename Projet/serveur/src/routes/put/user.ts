import { Router, Request, Response } from "express";
import {prisma} from "../../lib/prisma";
import {z} from "zod";

const router = Router();

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                roleId: Number(req.body.roleId)
            }
        })

        res.status(user ? 200 : 404).json({
            success: !!user,
            data: user ? user : 'unknow id'
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
