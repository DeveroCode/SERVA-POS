import { z } from "zod";
import { paginationSchema } from "./Pagination.type";

export const branchSchema = z.object({
    _id: z.string(),
    name: z.string(),
    slug: z.string(),
    phone: z.string(),
    email: z.string().email(),
    address: z.object({
        "street": z.string(),
        "city": z.string(),
        "state": z.string(),
        "country": z.string(),
        "zipCode": z.string(),
    })
})

export const branchesSchema = {
    data: z.array(branchSchema),
    pagination: paginationSchema
}

export type Branches = z.infer<typeof branchesSchema>;
export type Branch = z.infer<typeof branchSchema>;

export type getBranches = {
    businessId: string;
    branchId: Branch["_id"];
};

export type createNewBranch = Pick<Branch, "name" | "slug" | "phone" | "email" | "address">;

export type updateBrach = createNewBranch;