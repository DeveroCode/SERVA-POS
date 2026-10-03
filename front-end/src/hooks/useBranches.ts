import { queryKeys } from "@/lib/queryKeys";
import { BranchService } from "@/services/BranchService";
import type { Business } from "@/types/Index.types";
import { LAST_BUSINESS_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";

export function useBranches(businessId: Business["_id"], page: number = 1) {
   const currentBusinessId =
    businessId || localStorage.getItem(LAST_BUSINESS_KEY);
    return useQuery({
        queryKey: queryKeys.branch.page(currentBusinessId as Business["_id"], page),
        queryFn: () => BranchService.getBranches(currentBusinessId, page),
        retry: false,
        enabled: !!currentBusinessId && !!businessId,
        staleTime: 1000 * 60 * 10,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });
}