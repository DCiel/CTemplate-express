

export const config = {
    port: process.env.BACKEND_PORT || 4000,
    node_process: process.env.NODE_ENV || "development",

    url: {
        backend_url: process.env.BACKEND_URL,
    },
    
    database: {
        url: process.env.DATABASE_URL || "postgresql://ciel:ciel@localhost:5432/techmage",
    },
    
} as const;