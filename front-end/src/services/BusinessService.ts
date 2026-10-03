import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
    businessesSchema,
    type Business,
    type Businesses,
    type BusinessDetail,
    type CreateBusiness,
    type Response,
    type UpdateBusiness,
    type UploadBusinessImage,
    type UpdateActive,
} from "../types/Index.types";
import { getApiErrorMessage } from "../lib";

export class BusinessService {

    static async getBusinesses(page: number = 1): Promise<Businesses> {
        try {
            const { data } = await api.get<Businesses>(
                `/business/my-business?page=${page}`
            );
            const response = businessesSchema.safeParse(data);
            if (!response.success) {
                throw new Error("Respuesta inválida del servidor");
            }
            return response.data;

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error), { cause: error });
            }

            throw error;
        }
    }

    static async getBusinessById(
        id: Business["_id"]
    ): Promise<BusinessDetail> {

        try {
            const { data } = await api.get<BusinessDetail>(
                `/business/${id}`
            );

            return data;

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error), { cause: error });
            }

            throw error;
        }
    }

    static async create(
        formData: CreateBusiness
    ): Promise<string> {

        try {
            const { data } = await api.post<Response>(
                "/business/create",
                formData
            );

            return data.message;

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error), { cause: error });
            }

            throw error;
        }
    }

    static async update({
        formData,
        businessId,
    }: UpdateBusiness): Promise<string> {

        try {
            const { data } = await api.put<Response>(
                `/business/update/${businessId}`,
                formData
            );

            return data.message;

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error), { cause: error });
            }

            throw error;
        }
    }

    static async updateActive({ isActive, businessId }: UpdateActive): Promise<string> {
        try {
            const { data } = await api.patch<Response>(
                `/business/update/${businessId}/isActive`,
                { isActive }
            );

            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error), { cause: error });
            }

            throw error;
        }
    }
    static async delete(
        businessId: Business["_id"]
    ): Promise<Response> {

        try {
            const { data } = await api.delete<Response>(
                `/business/delete/${businessId}`
            );

            return data;

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error), { cause: error });
            }

            throw error;
        }
    }

    static async uploadLogo({
        image,
        _id: businessId,
    }: UploadBusinessImage): Promise<string> {

        const formData = new FormData();
        formData.append("image", image);

        try {
            const { data } = await api.patch<Response>(
                `/business/update/${businessId}/logo`,
                formData
            );

            return data.message;

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error), { cause: error });
            }

            throw error;
        }
    }

    static async uploadCover({
        image,
        _id: businessId,
    }: UploadBusinessImage): Promise<string> {

        const formData = new FormData();
        formData.append("image", image);

        try {
            const { data } = await api.patch<Response>(
                `/business/update/${businessId}/cover`,
                formData
            );

            return data.message;

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error), { cause: error });
            }

            throw error;
        }
    }
}
