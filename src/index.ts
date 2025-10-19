import { PrismaClient } from "@prisma/client";
import express from "express";
import path from "path";
import { initModules } from "./modules/init";
import routers from "./modules/routers";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { config } from "./common/config";
import { log } from "./common/utils/logger";

global.logger = log;


const app = express();

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, '/../public')));

// Healthcheck endpoint для Docker
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.use(routers);

async function main() {
    logger("info",`NODE_ENV                 `, config.node_process);

    await initModules();

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    

    app.use(cors({
        origin: ["http://localhost:3000", "http://localhost:3001", "http://45.10.42.197:3000", "http://45.10.42.197:3001"],
        credentials: true
    }));
    
    app.listen(config.port, () => {
        logger("info", `Listening on port ${config.port}...`);
    });
}

main();