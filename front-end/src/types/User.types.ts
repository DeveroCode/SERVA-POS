import { z } from "zod";
export const USER_ROLES = {
    OWNER: "owner",
    ADMIN: "admin",
    USER: "user",
} as const;

export type UserRoles = typeof USER_ROLES[keyof typeof USER_ROLES];

export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone_number: z.string(),
    birthday: z.string(),
    role: z.enum(Object.values(USER_ROLES)),
    image: z.string(),
    isActive: z.boolean(),
    lastLogin: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;


// Auth Types
export type RegisterForm = Pick<User, "name" | "email"> & {
    password: string;
    role: string;
};

export type LoginUser = Pick<RegisterForm, "email" | "password">;
export type UpdateUser = Pick<User, "name" | "last_name" | "email" | "phone_number" | "birthday">;
export type UpdatePasswordForm = Pick<RegisterForm, "password"> & {
    currentPassword: string
};

export type uploadImageProfile = {
    image: File
}