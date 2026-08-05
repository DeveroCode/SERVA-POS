import { queryKeys } from "@/lib/queryKeys";
import { BusinessService } from "@/services/BusinessService";
import { useQuery } from "@tanstack/react-query";
import type { Business } from "@/types/Index.types";

export function useBusiness(id: Business["_id"]) {
    const token = localStorage.getItem("token");

    return useQuery({
        queryKey: queryKeys.bussiness.one(id),
        queryFn: () => BusinessService.getBusinessById(id),
        enabled: !!token && !!id,
        retry: false,
        staleTime: 1000 * 60 * 10,
        // Delete the cache after 20 minutes of inactivity
        gcTime: 1000 * 60 * 20,

        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
}