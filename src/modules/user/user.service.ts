import type { Request, Response } from "express";
import { userSchema, type User, type UserCreate, type UserUpdate } from "./user.schemas";
import { validateSchema } from "@/common/validate";
import { prisma } from "@/database";

export class UserService {

    create = async (body: UserCreate) => {

        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        });

        if(user) {
            throw new Error("User many exist");
            return
        }
        
        await prisma.user.create({
            data: body
        });

        return "User created successfully";
    }

    delete = async (id: number) => {

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if(!user) {
            throw new Error("User not found");
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        });

        return "User deleted successfully";
    }

    getAll = async () => {
        const users = await prisma.user.findMany();

        return users;
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

    update = async (body: UserUpdate, id: number) => {

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if(!user) {
            throw new Error("User not found");
        }

        await prisma.user.update({
            where: { id },
            data: {
                ...user,
                ...body
            }
        });

        return "User updated successfully";
    }
}
