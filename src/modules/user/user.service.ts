import type { Request, Response } from "express";
import { userSchema, type User } from "./user.schemas";
import { validateSchema } from "@/common/validate";
import { prisma } from "@";

export class UserService {

    create = async (req: Request, res: Response) => {
        const body = await validateSchema({dto: req.body, schema: userSchema, schemaName: "/user/create"})

        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        });

        if(user) {
            res.json("User many exist");
            return
        }
        
        await prisma.user.create({
            data: body
        });

        res.json("ok");
        return;
    }

    delete = async (req: Request, res: Response) => {
        const body = req.body;
        const id = body.id;

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if(!user) {
            res.json("User not found");
            return;
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        });

        res.json("ok");
        return;
    }

    getAll = async (req: Request, res: Response) => {
        const users = await prisma.user.findMany();

        res.json(users);
        return;
    }

    get = async (req: Request, res: Response) => {
        const params = req.params;
        const id = Number(params.id);

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if(!user) {
            res.json("User not found");
            return;
        }

        res.json(user);
        return;
    }

    update = async (req: Request, res: Response) => {
        const body = await validateSchema({dto: req.body, schema: userSchema, schemaName: "/user/update"})

        const params = req.params;
        const id = Number(params.id);

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if(!user) {
            res.json("User not found");
            return;
        }

        await prisma.user.update({
            where: { id },
            data: {
                ...user,
                ...body
            }
        });

        res.json("ok");
        return;
    }
}
