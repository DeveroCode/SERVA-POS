import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { type Response, type RegisterForm, type LoginUser, type LoginResponse, type User, userSchema, MemberSchema, type Member } from "../types/Index.types";
import { jwtDecode } from "jwt-decode";
import { GET_TOKEN_KEY, SET_TOKEN_KEY } from "@/utils/key";
import { getApiErrorMessage } from "../lib";

interface JwtPayload {
    id: string;
    type: "owner" | "employee";
    iat: number;
    exp: number;
}

export class AuthService {
    static async getMe(): Promise<User | Member> {
        try {
            const token = localStorage.getItem(GET_TOKEN_KEY);

            if (!token) {
                throw new Error("No existe un token de autenticación");
            }

            const decoded = jwtDecode<JwtPayload>(token);

            const { data } = await api.get("/auth/me");

            if (decoded.type === "owner") {
                const response = userSchema.safeParse(data);

                if (!response.success) {
                    throw new Error("Los datos del usuario no son válidos");
                }

                return response.data;
            }

            if (decoded.type === "employee") {
                const response = MemberSchema.safeParse(data);

                if (!response.success) {
                    throw new Error("Los datos del miembro no son válidos");
                }

                return response.data;
            }

            throw new Error("Tipo de autenticación no válido");

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(
                    error.response.data.message,
                    { cause: error }
                );
            }

            throw error;
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
            const { data } = await api.post<LoginResponse>(
                "/auth/login",
                formData
            );

            localStorage.setItem(SET_TOKEN_KEY, data.token);

            return data.message;

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(
                    getApiErrorMessage(error.response.data.message),
                    { cause: error }
                );
            }

            throw error;
        }
    }
}