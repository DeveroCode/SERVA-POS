import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { Response, RegisterForm } from "types/Index.types";

export class AuthService {
    static async register(formData: RegisterForm): Promise<string> {
        try {
            const { data } = await api.post<Response>('/auth/create', formData);
            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
}