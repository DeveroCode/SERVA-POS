import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { type Response, type RegisterForm, type LoginUser, type LoginResponse, type User, userSchema } from "../types/Index.types";
import { SET_TOKEN_KEY } from "@/utils/key";

export class AuthService {
    static async getMe(): Promise<User> {
        try {
            const { data } = await api.get<User>('/auth/me');
            const response = userSchema.safeParse(data);
            if (response.success) {
                return response.data
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
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
            localStorage.setItem(SET_TOKEN_KEY, data.token);
            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
}