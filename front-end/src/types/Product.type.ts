import z from "zod";
import { paginationSchema } from "./Pagination.type";
// ==========================================
// 0 - SCHEMAS
// ==========================================
export const ProductSchema = z.object({
    _id: z.string(),
    name: z.string(),
    image: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    branch: z.string(),
    discount: z.number(),
    discountPrice: z.number(),
    ingredients: z.array(z.string()),
    available: z.boolean(),
})

export const ProductsSchema = z.object({
    data: z.array(ProductSchema),
    pagination: paginationSchema
})

// ==========================================
// 1 - TYPES
// ==========================================
export type Product = z.infer<typeof ProductSchema>
export type Products = z.infer<typeof ProductsSchema>
export type ProductForm = Pick<Product, "name" | "description" | "price" | "category" | "ingredients" | "available">

export type setDisccountForm = Pick<Product, "discount" | "discountPrice"> & { _id: string }
export type uploadProductImage = {
    image: File
    _id: string
}