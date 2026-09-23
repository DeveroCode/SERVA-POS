import api from "@/lib/axios";
import type { AddMemberToBranch, Credentials, GetMemberByBusiness, GetMemberById, Member, Members, FoundMember, GetByParams, RegisterMember, Response, SearchMemberParams, UpdateMember, UpdateMemberCredentials } from "@/types/Index.types";
import { CredentialsSchema, MembersSchema } from "@/types/Index.types";
import { LAST_BRANCH_KEY, LAST_BUSINESS_KEY } from "@/utils/key";
import { getApiErrorMessage } from "../lib";

export class BusinessMemberService {

    static async getMembers(_id: GetMemberByBusiness["_id"]): Promise<Members> {
        try {
            const { data } = await api<Members>(`/business-member/${_id}/members`);
            const response = MembersSchema.safeParse(data);
            if (response.success) {
                return response.data
            }
        } catch (error) {
            throw new Error(getApiErrorMessage(error), { cause: error });
        }
    }

    static async getMember({ _id, memberId }: GetMemberById): Promise<Member> {
        try {
            const { data } = await api<Member>(`/business-member/${_id}/${memberId}/member`)
            return data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error), { cause: error });
        }
    }

    static async searchMember({search}: SearchMemberParams): Promise<FoundMember> {
        const _id = localStorage.getItem(LAST_BUSINESS_KEY);
        try {
            const { data } = await api<FoundMember>(`/business-member/${_id}/${search}/search-member`);
            return data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error), { cause: error });
        }
    }

    static async add(formData: AddMemberToBranch): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        try {
            const { data } = await api.post<Response>(`/business-member/${businessId}/${formData.branchId}/${formData.memberId}/add/member`, formData);
            return data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error), { cause: error });
        }
    }

    static async update({ formData, memberId, branchId, businessId }: UpdateMemberCredentials): Promise<Response> {
        try {
            const { data } = await api.patch<Response>(`/business-member/${businessId}/${branchId}/${memberId}/update/member`, formData);
            return data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error), { cause: error });
        }
    }

    static async deleteMemberToBusiness(memberId: GetMemberById["memberId"]): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        const branchId = localStorage.getItem(LAST_BRANCH_KEY);
        try {
            const { data } = await api.delete<Response>(`/business-member/${businessId}/${branchId}/${memberId}/delete/member`);
            return data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error), { cause: error });
        }
    }

    static async getMemberCredentials({ memberId, businessId, branchId }: GetByParams): Promise<Credentials> {
        try {
            const { data } = await api.get<Credentials>(`/business-member/${businessId}/${branchId}/${memberId}/get/credentials`);
            const response = CredentialsSchema.safeParse(data);
            if (response.success) {
                return response.data
            }
        } catch (error) {
            throw new Error(getApiErrorMessage(error), { cause: error });
        }
    }

    /** Start register Member to Business */

    static async create(formData: RegisterMember): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        try {
            const { data } = await api.post<Response>(`/business-member/${businessId}/register/member`, formData);
            return data
        } catch (error) {
            throw new Error(getApiErrorMessage(error), { cause: error });
        }
    }

    static async updateMember({ memberId, formData }: UpdateMember): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        try {
            const { data } = await api.patch<Response>(`/business-member/${businessId}/update/${memberId}`, formData);
            return data
        } catch (error) {
            throw new Error(getApiErrorMessage(error), { cause: error });
        }
    }

    static async deleteMember(memberId: UpdateMember["memberId"]): Promise<Response> {
        const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
        const branchId = localStorage.getItem(LAST_BRANCH_KEY);
        try {
            const { data } = await api.delete<Response>(`/business-member/${businessId}/${branchId}/${memberId}/delete/member`);
            return data
        } catch (error) {
            throw new Error(getApiErrorMessage(error), { cause: error });
        }
    }

}