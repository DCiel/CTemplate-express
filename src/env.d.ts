// path = src/types/process-env.d.ts

export {}

import { LogLevel } from "./common/types/logger";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BACKEND_PORT: number;
            DATABASE_URL: string;
            BACKEND_URL: string;
        }
    }

    var logger: (level: LogLevel, ...args: any[]) => void;
    interface Global {
        logger: (level: LogLevel, ...args: any[]) => void;
    }
}