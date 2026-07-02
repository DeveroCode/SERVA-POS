import { z } from "zod";
export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone_number: z.string(),
    role: z.string(),
    image: z.string().optional(),
    isActive: z.boolean(),
    lastLogin: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;


// Auth Types
export type RegisterForm = Pick<User, "name" | "email" > & {
    password: string;
    role: string;
};

export type LoginUser = Pick<RegisterForm, "email" | "password">;