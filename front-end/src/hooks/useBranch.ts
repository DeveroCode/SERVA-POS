import { queryKeys } from "@/lib/queryKeys";
import { BranchService } from "@/services/BranchService";
import { useQuery } from "@tanstack/react-query";
import type { getBranches } from "@/types/Index.types";
import { SET_TOKEN_KEY } from "@/utils/key";

export function useBranch({
    businessId,
    branchId,
}: getBranches) {
    const token = localStorage.getItem(SET_TOKEN_KEY);
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