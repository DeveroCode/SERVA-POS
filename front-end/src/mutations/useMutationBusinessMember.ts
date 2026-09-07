import { queryKeys } from "@/lib/queryKeys";
import { BusinessMemberService } from "@/services/BusinessMemberService";
import type { AddMemberToBranch, SearchMemberParams } from "@/types/Member.types";
import { LAST_BUSINESS_KEY } from "@/utils/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export function useAddMemberToBusiness(){
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
        }
    });
}

export function useRegisterMember(){
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

export function useSearchMember(){
    return useMutation({
        mutationFn: (email: SearchMemberParams["email"]) =>BusinessMemberService.searchMember(email),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
}