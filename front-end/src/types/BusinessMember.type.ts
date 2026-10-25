import { z } from "zod";

import type { Business } from "./Business.types";
import type { Branch } from "./Branch.types";
import type { Member } from "./Member.types";

// ==========================================
// 0 - ENUMS
// ==========================================

export const MEMBER_ROLES = {
    OWNER: "owner",
    ADMIN: "admin",
    EMPLOYEE: "employee",
    MANAGER: "manager",
    STAFF: "staff",
    CHASHER: "chasher"
} as const;

export const MEMBER_ROLES_EXPLAIN = {
    OWNER: "Propietario (Owner)",
    ADMIN: "Administrador (Admin)",
    MANAGER: "Gerente (Manager)",
    STAFF: "Empleado (Staff)",
    CHASHER: "Cajero (Chasher)"
};

export type MemberRole =
    (typeof MEMBER_ROLES)[keyof typeof MEMBER_ROLES];

// ==========================================
// 1 - SCHEMAS
// ==========================================

export const BusinessMembersSchema = z.array(
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

// ==========================================
// 2 - TYPES
// ==========================================

export type BusinessMembers = z.infer<
    typeof BusinessMembersSchema
>;

export type BusinessMember = z.infer<
    typeof BusinessMembersSchema
>[0];

export type FoundMember = {
    foundMember: Member[];
    message: string;
};
export type FoundBranch = {
    foundBranch: Branch[];
    message: string;
};

export type AddMemberToBranch = {
    role: MemberRole;
    password: string;
    passwordConfirm: string;
    userKey: string;
    memberId: string;
    branchId: string;
};

export type CredentialsDetails = {
    _id: string;
    name: string;
    last_name: string;
}

// ==========================================
// 3 - PARAMS TYPES
// ==========================================

export type GetByParams = {
    memberId: Member["_id"];
    businessId: Business["_id"];
    branchId: Branch["_id"];
};

export type GetMemberById = {
    _id: Business["_id"];
    memberId: Member["_id"];
};

export type getCredentials = {
    branchId: Branch["_id"];
    employeeId: Member["_id"];
}

export type SearchMemberParams = {
    search: string;
}

export type GetMemberByBusiness = Pick<
    Business,
    "_id"
>;

