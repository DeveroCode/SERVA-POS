import { z } from "zod";
import { MEMBER_ROLES } from "./BusinessMember.type";

export type UserRoles = typeof MEMBER_ROLES[keyof typeof MEMBER_ROLES];

export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone_number: z.string(),
    birthday: z.string(),
    role: z.enum(Object.values(MEMBER_ROLES)),
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

export type LoginUser = Pick<RegisterForm, "password"> & {
    identifier: string;
};
export type UpdateUser = Pick<User, "name" | "last_name" | "email" | "phone_number" | "birthday">;
export type UpdatePasswordForm = Pick<RegisterForm, "password"> & {
    currentPassword: string
};
export type RegisterUserForm = Pick<User,
    "name" | "last_name" | "email" | "phone_number" | "birthday" | "role" | "isActive">

export type uploadImageProfile = {
    image: File
}