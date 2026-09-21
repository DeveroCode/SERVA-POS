import { z } from "zod";
// Type base
export const singleBusinessSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  description: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  socialMedia: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

// 2. Esquema para las estadísticas calculadas en el Backend
export const businessStatsSchema = z.object({
  activeBranches: z.number(),
  employees: z.number(),
  administrators: z.number(),
});

// 3. Esquema para un solo negocio CON estadísticas (lo que devuelve la API para /business/:id)
export const businessWithStatsSchema = singleBusinessSchema.extend({
  stats: businessStatsSchema,
});
export const businessSchema = z.array(singleBusinessSchema);

// --- TIPOS DE TYPESCRIPT ---
export type Businesses = z.infer<typeof businessSchema>;
export type BusinessBase = z.infer<typeof singleBusinessSchema>;
export type BusinessStats = z.infer<typeof businessStatsSchema>;

// Tipo principal para las vistas de un negocio individual
export type Business = z.infer<typeof businessWithStatsSchema>;

export type CreateBusiness = Pick<
  BusinessBase,
  "name" | "slug" | "email" | "phone" | "description" | "socialMedia"
>;

export type UpdateBusiness = {
  formData: CreateBusiness;
  businessId: BusinessBase["_id"];
};

export type UploadLogoBusiness = Pick<BusinessBase, "_id"> & { image: File };