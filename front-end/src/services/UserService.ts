import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { Response, UpdatePasswordForm, UpdateUser, uploadImageProfile } from "types/Index.types";
export class UserService {
    static async updateUser(formData: UpdateUser): Promise<string> {
        try {
            const { data } = await api.patch<Response>('/auth/update', formData);
            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async updateImage({ image }: uploadImageProfile): Promise<string> {
        const formData = new FormData();
        formData.append('image', image);
        try {
            const { data } = await api.put<Response>('/auth/upload/image-profile', formData);
            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async changePassword(formData: UpdatePasswordForm): Promise<string> {
        try {
            const { data } = await api.put<Response>('/auth/update-password', formData);
            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
}