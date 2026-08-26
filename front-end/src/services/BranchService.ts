import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { branchesSchema, type Branch, type Branches, type Business, type createNewBranch, type getBranches, type Response, type updateBrach } from "@/types/Index.types";
import { LAST_BRANCH_KEY, LAST_BUSINESS_KEY } from "@/utils/key";

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

    static async create(formData: createNewBranch): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        try {
            const { data } = await api.post<Response>(`/branch/${businessId}/add`, formData);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }

    static async updateBranch(formData: updateBrach): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        const branchId = localStorage.getItem(LAST_BRANCH_KEY);
        try {
            const { data } = await api.patch<Response>(`/branch/${businessId}/${branchId}/update`, formData);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }

    static async delete(branchId: Branch["_id"]): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        try {
            const { data } = await api.delete<Response>(`/branch/${businessId}/${branchId}/delete`);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
}