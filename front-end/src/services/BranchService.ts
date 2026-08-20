import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { branchesSchema, type Branch, type Branches, type Business, type getBranches } from "@/types/Index.types";

export class BranchService {
    static async getBranches(businessId: Business["_id"]): Promise<Branches> {
        try {
            const { data } = await api.get<Branches>(`/branch/${businessId}/branches`);
            const response = branchesSchema.safeParse(data);
            if (response.success) {
                return response.data
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async getBranch({ businessId, branchId }: getBranches): Promise<Branch> {
        try {
            const { data } = await api.get<Branch>(`/branch/${businessId}/${branchId}`);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
}