import api from "@/lib/axios";
import { branchesSchema, type Branches, CategoriesSchema, type Categories, type Employees, employeesSchema, type Branch, branchSchema } from "@/types/Index.types";
import { isAxiosError } from "axios";
import { getApiErrorMessage } from "../lib";

export class EmployeeService {
    static async getBranches(page: number = 1): Promise<Branches> {
        try {
            const { data } = await api.get<Branches>(`/employee/branches?page=${page}`);
            const response = branchesSchema.safeParse(data);
            if (response.success) {
                return response.data
            }

            throw new Error("La respuesta no cumple con el esquema, favor de revisar tus types de datos");
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error.response?.data.message), { cause: error });
            }
        }
    }

    static async getEmployees(page: number = 1, branchId: Branch["_id"]): Promise<Employees> {
        try {
            const { data } = await api.get<Employees>(`/employee/branch/${branchId}/employees?page=${page}`);
            const response = employeesSchema.safeParse(data);
            if (response.success) {
                return response.data
            }

            throw new Error("La respuesta no cumple con el esquema, favor de revisar tus types de datos");
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error.response?.data.message), { cause: error });
            }
        }
    }
    static async getBranchByID(branchId: Branch["_id"]): Promise<Branch> {
        try {
            const { data } = await api.get<Branch>(`/employee/branch/${branchId}`);
            const response = branchSchema.safeParse(data);
            if (response.success) {
                return response.data
            }

            throw new Error("La respuesta no cumple con el esquema, favor de revisar tus types de datos");
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error.response?.data.message), { cause: error });
            }
        }
    }

    static async getCategories(): Promise<Categories> {
        try {
            const { data } = await api<Categories>('/employee/categories');
            const response = CategoriesSchema.safeParse(data);
            if (response.success) {
                return response.data
            }

            throw new Error("La respuesta no cumple con el esquema, favor de revisar tus types de datos");
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(getApiErrorMessage(error.response?.data.message), { cause: error });
            }
        }
    }
}