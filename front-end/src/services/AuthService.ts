import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { Response, RegisterForm, LoginUser, LoginResponse } from "types/Index.types";

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
    static async login(formData: LoginUser): Promise<string> {
        try {
            const { data } = await api.post<LoginResponse>('/auth/login', formData);
            localStorage.setItem('token', data.token);
            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
}