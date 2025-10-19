import { prisma } from "@";

export const UserInit = async () => {
    await prisma.user.upsert({
        where: {
            email: "ciel@gmail.com",
        },
        create: {
            name: "Ciel",
            email: "ciel@gmail.com",
        },
        update: { }
    });

}