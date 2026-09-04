import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { businessSchema, type Business, type Businesses, type CreateBusiness, type RegisterUserForm, type Response, type UpdateBusiness, type UploadLogoBusiness } from "../types/Index.types";


export class BusinessService {
    static async getBusinesses(): Promise<Businesses> {
        try {
            const { data } = await api.get<Businesses>('/business/my-business');
            const response = businessSchema.safeParse(data);
            if (response.success) {
                return response.data
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async getBusinessById(id: Business["_id"]): Promise<Business> {
        try {
            const { data } = await api.get<Business>(`/business/${id}`);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }

    static async create(formData: CreateBusiness): Promise<string> {
        try {
            const { data } = await api.post<Response>('/business/create', formData);
            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async update({ formData, businessId }: UpdateBusiness): Promise<string> {
        try {
            const { data } = await api.put<Response>(`/business/update/${businessId}`, formData);
            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }

    static async delete(businessId: Business["_id"]): Promise<Response> {
        try {
            const { data } = await api.delete<Response>(`/business/delete/${businessId}`);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }


    static async uploadLogo({ image, _id: businessId }: UploadLogoBusiness): Promise<string> {
        const formData = new FormData();
        formData.append('image', image);
        try {
            const { data } = await api.patch<Response>(`/business/update/${businessId}/logo`, formData);
            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async uploadCover({ image, _id: businessId }: UploadLogoBusiness): Promise<string> {
        const formData = new FormData();
        formData.append('image', image);
        try {
            const { data } = await api.patch<Response>(`/business/update/${businessId}/cover`, formData);
            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }

    static async registerUser(formData: RegisterUserForm): Promise<Response> {
        try {
            const { data } = await api.post<Response>('/business/register-user', formData);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
}