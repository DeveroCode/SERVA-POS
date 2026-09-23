import useBusinessContext from "@/hooks/useBusinessContext";
import { queryKeys } from "@/lib/queryKeys";
import { BusinessMemberService } from "@/services/BusinessMemberService";
import type { AddMemberToBranch, GetByParams, GetMemberById, SearchMemberParams, UpdateMember, UpdateMemberCredentials } from "@/types/Index.types";
import { LAST_BUSINESS_KEY } from "@/utils/key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export function useAddMemberToBusiness() {
    const navigate = useNavigate();
    const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
    const QC = useQueryClient();
    return useMutation({
        mutationFn: (formData: AddMemberToBranch) => BusinessMemberService.add(formData),
        onSuccess: (data) => {
            toast.success(data.message);
            navigate(`/dashboard/business/${businessId}/personnel`);
            QC.invalidateQueries({ queryKey: queryKeys.bussiness.members(businessId) });
        },
        onError: (error: Error) => {
            toast.error(error.message);
            return error;
        }
    });
}

export function useUpdateMember() {
    const { QC, navigate, currentBusinessId: businessId } = useBusinessContext();

    return useMutation({
        mutationFn: (formData: UpdateMember) => BusinessMemberService.updateMember(formData),
        onSuccess: async (data) => {
            toast.success(data.message);
            await QC.invalidateQueries({
                queryKey: queryKeys.bussiness.members(businessId),
            });
            navigate(`/dashboard/business/${businessId}/personnel`);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}


export function useDeleteMember() {
    const { QC, navigate, currentBusinessId: businessId } = useBusinessContext();

    return useMutation({
        mutationFn: (memberId: UpdateMember["memberId"]) => BusinessMemberService.deleteMemberToBusiness(memberId),
        onSuccess: async (data) => {
            toast.success(data.message);
            await QC.invalidateQueries({
                queryKey: queryKeys.bussiness.members(businessId),
            });
            navigate(`/dashboard/business/${businessId}/personnel`);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}

export function useRegisterMember() {
    const navigate = useNavigate();
    const QC = useQueryClient();
    const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
    return useMutation({
        mutationFn: BusinessMemberService.create,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate(`/dashboard/business/${businessId}/personnel`);
            QC.invalidateQueries({ queryKey: queryKeys.bussiness.members(businessId) });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}

export function useSearchMember() {
    return useMutation({
        mutationFn: (search: SearchMemberParams) => BusinessMemberService.searchMember(search),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
}

export function useGetMember({ _id, memberId }: GetMemberById) {
    return useQuery({
        queryKey: queryKeys.bussiness.member(memberId, _id),
        queryFn: () =>
            BusinessMemberService.getMember({ _id, memberId }),
        enabled: Boolean(_id) && Boolean(memberId),
    });
}

export function useGetMemberCredentials({ memberId, businessId, branchId }: GetByParams) {
    return useQuery({
        queryKey: queryKeys.bussiness.credentials(businessId, branchId, memberId),
        queryFn: () =>
            BusinessMemberService.getMemberCredentials({ memberId, businessId, branchId }),
        enabled: Boolean(businessId) && Boolean(branchId) && Boolean(memberId),
    })
}

export function useUpdateMemberCredentials() {
    const { navigate } = useBusinessContext();
    const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
    return useMutation({
        mutationFn: ({ formData, memberId, branchId, businessId }: UpdateMemberCredentials) => BusinessMemberService.update({ formData, memberId, branchId, businessId }),
        onSuccess: (data) => {
            toast.success(data.message);
            navigate(`/dashboard/business/${businessId}/personnel`);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}