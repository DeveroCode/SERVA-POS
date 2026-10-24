import { z } from "zod";
import { MEMBER_ROLES, type MemberRole } from "./BusinessMember.type";
import { paginationSchema } from "./Pagination.type";
import type { Branch } from "./Branch.types";

// ==========================================
// 0 - SCHEMAS
// ==========================================

export const CredentialsUserSchema = z.object({
    _id: z.string(),
    name: z.string(),
    last_name: z.string()
})

export const credentialsSchema = z.object({
    _id: z.string(),
    userKey: z.string(),
    branch: z.object({
        name: z.string(),
    }),
    user:  CredentialsUserSchema,
    role: z.enum(Object.values(MEMBER_ROLES)),
});

export const CategorySchema = z.object({
    _id: z.string(),
    name: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
});

export const statsSchema = z.object({
    activeEmployees: z.number(),
    totalEmployees: z.number(),
    totalAdministrators: z.number(),
})
export const CategoriesSchema = z.array(CategorySchema);

export const employeeSchema = z.object({
    _id: z.string(),
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone_number: z.string(),
    image: z.string().optional(),
    isActive: z.boolean(),
    lastLogin: z.string().optional(),
    role: z.enum(Object.values(MEMBER_ROLES)),
})
export const employeesSchema = z.object({
    data: z.array(employeeSchema),
    stats: statsSchema,
    pagination: paginationSchema
})
export const getEmployeesSchema = z.object({
    data: z.array(employeeSchema),
    pagination: paginationSchema
})
// ==========================================
// 1 - TYPES
// ==========================================

export type Employee = z.infer<typeof employeeSchema>;
export type Employees = z.infer<typeof employeesSchema>;
export type GetEmployees = z.infer<typeof getEmployeesSchema>;

export type Category = z.infer<typeof CategorySchema>;
export type Categories = z.infer<typeof CategoriesSchema>;


export type Credentials = z.infer<typeof credentialsSchema>;
export type CredentialForm = {
    userKey: string;
    password: string;
}

export type updateCredentialsForm = {
    name: string;
    role: MemberRole;
    userKey: string;
    password: string;
    branchName: string;
    passwordConfirm: string;
}

export type updateEmployeeCredentialsForms = {
    formData: Pick<updateCredentialsForm, "name" | "role" | "userKey" | "password">
    employeeId: Employee["_id"]
    branchId: string
}

export type accessBranchResponse = {
    message: string;
    expiresAt: string;
}

export type searchEmployee = {
    branchId: Branch["_id"];
    search: string;
    page?: number
}

export type searchEmplooyeForm = {
    role: MemberRole | null,
    isActive: boolean
    search: string
}