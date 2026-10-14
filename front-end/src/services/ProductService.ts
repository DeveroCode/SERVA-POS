import api from "@/lib/axios";
import type { Product, Response, setDisccountForm, uploadProductImage } from "@/types/Index.types";
import { ProductSchema, ProductsSchema, type ProductForm, type Products } from "@/types/Product.type";
import { LAST_BRANCH_KEY } from "@/utils/key";
import { isAxiosError } from "axios";

const branchId = localStorage.getItem(LAST_BRANCH_KEY);

export class ProductService {
    static async getOne(_id: Product["_id"]): Promise<Product> {
        try {
            const { data } = await api.get<Product>(`/product/${branchId}/one/${_id}`);
            const response = ProductSchema.safeParse(data);
            if (response.success) {
                return response.data
            }

            throw new Error("La respuesta no cumple con el esquema, favor de revisar tus types de datos");
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }

    static async getAll(page: number = 1): Promise<Products> {
        try {
            const { data } = await api.get<Products>(`/product/${branchId}/all?page=${page}`);
            const response = ProductsSchema.safeParse(data);
            if (response.success) {
                return response.data
            }

            throw new Error("La respuesta no cumple con el esquema, favor de revisar tus types de datos");
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async create(formData: ProductForm): Promise<Response> {
        try {
            const { data } = await api.post<Response>(`/product/${branchId}/create`, formData);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    };
    static async update(formData: ProductForm, _id: Product["_id"]): Promise<Response> {
        try {
            const { data } = await api.put<Response>(`/product/${branchId}/update/${_id}`, formData);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async delete(_id: Product["_id"]): Promise<Response> {
        try {
            const { data } = await api.delete<Response>(`/product/${branchId}/delete/${_id}`);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async setDiscount(formData: setDisccountForm): Promise<Response> {
        try {
            const { data } = await api.put<Response>(`/product/${branchId}/${formData._id}/set/discount`, formData);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async uploadImage({ image, _id }: uploadProductImage): Promise<Response> {
        const formData = new FormData();
        formData.append('image', image);
        try {
            const { data } = await api.patch<Response>(`/product/${branchId}/${_id}/upload/image`, formData);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
}