import { z } from "zod";
import { MEMBER_ROLES } from "./BusinessMember.type";
import { paginationSchema } from "./Pagination.type";

// ==========================================
// 0 - SCHEMAS
// ==========================================

export const MemberSchema = z.object({
    _id: z.string(),
    name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone_number: z.string(),
    image: z.string().optional(),
    isActive: z.boolean(),
    business: z.object({
        name: z.string(),
    }),
    role: z.enum(Object.values(MEMBER_ROLES)),
    lastLogin: z.string().optional(),
});

export const MembersSchema = z.object({
    data: z.array(MemberSchema),
    pagination: paginationSchema
});

// ==========================================
// 1 - TYPES
// ==========================================

export type Member = z.infer<typeof MemberSchema>;

export type Members = z.infer<typeof MembersSchema>;

// ==========================================
// 2 - REGISTER MEMBERS
// ==========================================

export type RegisterMember = {
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    isActive: boolean;
};

export type UpdateMember = {
    memberId: Member["_id"];
    formData: RegisterMember;
};

export type UploadImageMember = {
    _id: Member["_id"];
    file: File;
};