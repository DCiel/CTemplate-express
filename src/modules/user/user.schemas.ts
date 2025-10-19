import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userSchema>;

export const userUpdateSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
});

export type UserUpdate = z.infer<typeof userUpdateSchema>;

export const userDeleteSchema = z.object({
    id: z.number(),
});

export type UserDelete = z.infer<typeof userDeleteSchema>;
