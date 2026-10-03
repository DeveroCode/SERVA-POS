import { z } from "zod";
import { paginationSchema } from "./Pagination.type";

// --------------------------------------------------
// SCHEMAS
// --------------------------------------------------

export const businessSchema = z.object({
    _id: z.string(),
    name: z.string(),
    slug: z.string(),
    logo: z.string().optional(),
    coverImage: z.string().optional(),
    description: z.string().optional(),
    email: z.string().email(),
    phone: z.string(),
    isActive: z.boolean().optional(),
    socialMedia: z.object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
    }),
});

export const businessStatsSchema = z.object({
    activeBranches: z.number(),
    employees: z.number(),
    administrators: z.number(),
});

export const businessesSchema = z.object({
    data: z.array(businessSchema),
    pagination: paginationSchema,
});

export const businessDetailSchema = businessSchema.extend({
    stats: businessStatsSchema,
});

// --------------------------------------------------
// TYPES
// --------------------------------------------------

export type Business = z.infer<typeof businessSchema>;

export type Businesses = z.infer<typeof businessesSchema>;

export type BusinessStats = z.infer<typeof businessStatsSchema>;

export type BusinessDetail = z.infer<typeof businessDetailSchema>;

// --------------------------------------------------
// CREATE / UPDATE
// --------------------------------------------------

export type CreateBusiness = Pick<
    Business,
    "name" |
    "slug" |
    "email" |
    "phone" |
    "description" |
    "socialMedia"
>;

export type UpdateBusiness = {
    formData: CreateBusiness;
    businessId: Business["_id"];
};
export type UpdateActive = {
    isActive: Business["isActive"];
    businessId: Business["_id"];
};

// --------------------------------------------------
// UPLOADS
// --------------------------------------------------

export type UploadBusinessImage = {
    _id: Business["_id"];
    image: File;
};
