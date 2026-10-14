import { queryKeys } from "@/lib/queryKeys";
import { ProductService } from "@/services/ProductService";
import type { Branch } from "@/types/Index.types";
import { GET_TOKEN_KEY, LAST_BRANCH_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";

export function useProducts(branchId: Branch["_id"], page: number = 1) {
    const currentBusinessId =
        branchId || localStorage.getItem(LAST_BRANCH_KEY);
    const token = localStorage.getItem(GET_TOKEN_KEY);
    return useQuery({
        queryKey: queryKeys.products.page(currentBusinessId as Branch["_id"], page),
        queryFn: () => ProductService.getAll(page),
        retry: false,
        enabled: !!currentBusinessId && !!token,
        staleTime: 1000 * 60 * 10,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });
}
