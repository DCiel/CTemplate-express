import { prisma } from "@";
import { UserInit } from "./user"

export const initModules = async () => {
    prisma.$connect();
    UserInit();
}