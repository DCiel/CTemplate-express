import { prisma } from "@";
import { UserInit } from "./user"

export const initModules = async () => {
    logger("info", "Connecting to database...");
    await prisma.$connect();
    logger("info", "Database connected successfully");
    logger("info", "Initializing user...");
    await UserInit();
    logger("info", "User initialized successfully");
}