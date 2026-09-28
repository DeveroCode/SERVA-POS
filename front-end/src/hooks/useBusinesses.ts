import { queryKeys } from "@/lib/queryKeys";
import { BusinessService } from "@/services/BusinessService";
import { SET_TOKEN_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";

export function useBusinesses(page: number) {
    const token = localStorage.getItem(SET_TOKEN_KEY);
    return useQuery({
        queryKey: queryKeys.bussiness.all(page),
        queryFn: () => BusinessService.getBusinesses(page),
        retry: false,
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });
}