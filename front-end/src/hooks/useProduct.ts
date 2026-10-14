import { queryKeys } from "@/lib/queryKeys";
import { ProductService } from "@/services/ProductService";
import type { Branch } from "@/types/Branch.types";
import { GET_TOKEN_KEY, LAST_BRANCH_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";

export function useProduct(branchId: Branch["_id"]) {
    const token = localStorage.getItem(GET_TOKEN_KEY)
    const currentBranchId = branchId || localStorage.getItem(LAST_BRANCH_KEY);

    return useQuery({
        queryKey: queryKeys.products.one(currentBranchId as Branch["_id"], branchId),
        queryFn: () => ProductService.getOne(currentBranchId),
        retry: false,
        staleTime: 1000 * 60 * 10,
        enabled:
            !!token &&
            !!branchId,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
}