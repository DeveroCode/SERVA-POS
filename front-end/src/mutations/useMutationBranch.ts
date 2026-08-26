import { queryKeys } from "@/lib/queryKeys";
import { BranchService } from "@/services/BranchService";
import { LAST_BRANCH_KEY, LAST_BUSINESS_KEY } from "@/utils/key";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useCreateBranch() {
    const navigate = useNavigate();
    const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
    const QC = useQueryClient();


    return useMutation({
        mutationFn: BranchService.create,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate(`/dashboard/business/${businessId}/branches`);
            QC.invalidateQueries({ queryKey: queryKeys.branch.all });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}

export function useUpdateBranch() {
    const navigate = useNavigate();
    const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
    const branchId = localStorage.getItem(LAST_BRANCH_KEY);
    const QC = useQueryClient();

    return useMutation({
        mutationFn: BranchService.updateBranch,
        onSuccess: async (data) => {
            toast.success(data.message);
            await Promise.all([
                QC.invalidateQueries({ queryKey: queryKeys.branch.all }),
                QC.invalidateQueries({ queryKey: queryKeys.branch.one(businessId, branchId) }),
            ])
            navigate(`/dashboard/business/${businessId}/branches`);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}