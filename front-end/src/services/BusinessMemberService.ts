import api from "@/lib/axios";
import type { AddMemberToBranch, FoundMember, RegisterMember, Response, SearchMemberParams, UpdateMember, UpdateMemberToBusiness } from "@/types/Index.types";
import { MembersSchema, type GetMemberByBusiness, type GetMemberById, type Member, type Members } from "@/types/Member.types";
import { LAST_BRANCH_KEY, LAST_BUSINESS_KEY } from "@/utils/key";
import { isAxiosError } from "axios";

export class BusinessMemberService {
    static async getMembers(_id: GetMemberByBusiness["_id"]): Promise<Members> {
        try {
            const { data } = await api<Members>(`/business-member/${_id}/members`);
            const response = MembersSchema.safeParse(data);
            if (response.success) {
                return response.data
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }

    static async getMember({ _id, memberId }: GetMemberById): Promise<Member> {
        try {
            const { data } = await api<Member>(`/business-member/${_id}/${memberId}/member`)
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }

    static async searchMember(email: SearchMemberParams["email"]): Promise<FoundMember> {
        const _id = localStorage.getItem(LAST_BUSINESS_KEY);
        try {
            const { data } = await api<FoundMember>(`/business-member/${_id}/${email}/search-member`);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }

    static async add(formData: AddMemberToBranch): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        try {
            const { data } = await api.post<Response>(`/business-member/${businessId}/${formData.branchId}/${formData.memberId}/add/member`, formData);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async update(formData: UpdateMemberToBusiness, memberId: GetMemberById["memberId"]): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        const branchId = localStorage.getItem(LAST_BRANCH_KEY);
        try {
            const { data } = await api.patch<Response>(`/business-member/${businessId}/${branchId}/${memberId}/update/member`, formData);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async delete(memberId: GetMemberById["memberId"]): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        const branchId = localStorage.getItem(LAST_BRANCH_KEY);
        try {
            const { data } = await api.delete<Response>(`/business-member/${businessId}/${branchId}/${memberId}/delete/member`);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }

    /** Start register Member to Business */
    static async create(formData: RegisterMember): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        try {
            const {data} = await api.post<Response>(`/business-member/${businessId}/register/member`, formData);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async updateMember({memberId, formData}: UpdateMember): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        try {
            const {data} = await api.patch<Response>(`/business-member/${businessId}/update/${memberId}`, formData);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
    static async deleteMember({memberId}: UpdateMember): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        try {
            const {data} = await api.delete<Response>(`/business-member/${businessId}/delete/${memberId}`);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response?.data.message, { cause: error });
            }
        }
    }
}