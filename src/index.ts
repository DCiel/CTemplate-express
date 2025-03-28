import { PrismaClient } from "@prisma/client";
import express from "express";
import path from "path";
import { initModules } from "./modules/init";
import routers from "./modules/routers";


const app = express();
const port = process.env.PORT;

export const prisma = new PrismaClient();

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, '/../public')));
app.use(routers);

async function main() {
    await initModules();
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });
}

main();