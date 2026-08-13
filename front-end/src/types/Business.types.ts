import { z } from "zod";

export const businessSchema = z.array(
  z.object({
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
    })
  })
);

export type Businesses = z.infer<typeof businessSchema>;
export type Business = z.infer<typeof businessSchema>[0];

export type CreateBusiness = Pick<
  Business,
  "name" | "slug" | "email" | "phone" | "description" | "socialMedia"
>;

export type UpdateBusiness = {
  formData: CreateBusiness;
  businessId: Business["_id"];
};

export type UploadLogoBusiness = Pick<Business, "_id"> & { image: File };