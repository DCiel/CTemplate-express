import { ZodError } from "zod";
import { type NextFunction, type Request, type Response } from "express";


export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
        res.status(400).json({
            error: "Validation failed",
            details: err.issues.map((e) => ({
                path: e.path.join("."),
                message: e.message,
            })),
        });
    }

    const status = err.status || 500;
    const data = err.message || "Something went wrong";

    res.status(status).json(data);
}
