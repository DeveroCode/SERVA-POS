import { z } from "zod";
import { MEMBER_ROLES } from "./BusinessMember.type";
import { paginationSchema } from "./Pagination.type";

// ==========================================
// 0 - SCHEMAS
// ==========================================

export const CategorySchema = z.object({
    _id: z.string(),
    name: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
});

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
   pagination: paginationSchema
})

// ==========================================
// 1 - TYPES
// ==========================================

export type Employee = z.infer<typeof employeeSchema>;
export type Employees = z.infer<typeof employeesSchema>;

export type Category = z.infer<typeof CategorySchema>;
export type Categories = z.infer<typeof CategoriesSchema>;