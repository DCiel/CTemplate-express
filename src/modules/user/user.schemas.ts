import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;