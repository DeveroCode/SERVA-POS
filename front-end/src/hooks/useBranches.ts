import { queryKeys } from "@/lib/queryKeys";
import { BranchService } from "@/services/BranchService";
import type { Business } from "@/types/Index.types";
import { SET_TOKEN_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";

export function useBranches(businessId: Business["_id"], page: number = 1) {
    const token = localStorage.getItem(SET_TOKEN_KEY);
    return useQuery({
        queryKey: queryKeys.branch.page(page),
        queryFn: () => BranchService.getBranches(businessId, page),
        retry: false,
        enabled: !!token && !!businessId,
        staleTime: 1000 * 60 * 10,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });
}