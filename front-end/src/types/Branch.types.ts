import { z } from "zod";

export const branchesSchema = z.array(
    z.object({
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
);

export type Branches = z.infer<typeof branchesSchema>;
export type Branch = Branches[number];

export type getBranches = {
    businessId: string;
    branchId: Branch["_id"];
};

export type createNewBranch = Pick<Branch, "name" | "slug" | "phone" | "email" | "address">;

export type updateBrach = createNewBranch;