// / <reference types="node" />

import { Network } from "@orbs-network/ton-access";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
        }
    }
}