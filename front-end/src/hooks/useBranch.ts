import { queryKeys } from "@/lib/queryKeys";
import { BranchService } from "@/services/BranchService";
import { useQuery } from "@tanstack/react-query";
import type { Branch } from "@/types/Index.types";
import { LAST_BUSINESS_KEY, SET_TOKEN_KEY } from "@/utils/key";

export function useBranch(branchId: Branch["_id"]) {
    const token = localStorage.getItem(SET_TOKEN_KEY);
    const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
    return useQuery({
        queryKey: queryKeys.branch.one(
            businessId,
            branchId
        ),
        queryFn: () =>
            BranchService.getBranch({
                businessId,
                branchId,
            }),
        retry: false,

        staleTime: 1000 * 60 * 10,

        enabled:
            !!token &&
            !!branchId &&
            !!businessId,

        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
}