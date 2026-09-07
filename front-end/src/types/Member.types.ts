import { z } from "zod";
import type { Business } from "./Business.types";

export const MEMBER_ROLES = {
    OWNER: "owner",
    ADMIN: "admin",
    MANAGER: "manager",
    STAFF: "staff"
} as const;

export const MEMBER_ROLES_EXPLAIN = {
    OWNER: "Propietario (Owner)",
    ADMIN: "Administrador (Admin)",
    MANAGER: "Gerente (Manager)",
    STAFF: "Empleado (Staff)",
}

export type MemberRole =
    (typeof MEMBER_ROLES)[keyof typeof MEMBER_ROLES];


export const MembersSchema = z.array(
    z.object({
        _id: z.string(),
        name: z.string(),
        last_name: z.string(),
        email: z.string(),
        phone_number: z.string(),
        image: z.string().optional(),
        isActive: z.boolean(),
        lastLogin: z.string().optional(),
        role: z.enum(Object.values(MEMBER_ROLES)),
        business: z.object({
            name: z.string(),
        }),
    })
);


export type Members = z.infer<typeof MembersSchema>;

export type Member = z.infer<typeof MembersSchema>[0];
export type FoundMember = {
    foundMember: {
        _id: string;
        name: string;
        last_name: string;
        email: string;
        phone_number: string;
        image: string;
        role: MemberRole;
    }
    message: string
};
export type AddMemberToBranch = {
    role: MemberRole;
    password: string;
    passwordConfirm: string;
    userKey: string;
    memberId: string;
    branchId: string;
}

export type UpdateMemberToBusiness = Pick<AddMemberToBranch, "role" | "password" | "userKey">;
export type GetMemberById = {
    _id: Business["_id"];
    memberId: Member["_id"];
};
export type GetMemberByBusiness = Pick<Business, "_id">;

/** Register Members */
export type RegisterMember = {
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    isActive: boolean;
    role: MemberRole;
}
export type UpdateMember = Pick<GetMemberById, "memberId"> & {
    formData: {
        name: string;
        last_name: string;
        email: string;
        phone_number: string;
        isActive: boolean;
        role: MemberRole;
    }
}

export type UploadImageMember = {
    _id: string;
    file: File;
}

export type SearchMemberParams = Pick<Member, "email">;