import { queryKeys } from "@/lib/queryKeys";
import { BusinessService } from "@/services/BusinessService";
import { useQuery } from "@tanstack/react-query";

export function useBusinesses() {
    const token = localStorage.getItem('token');
    return useQuery({
        queryKey: queryKeys.bussiness.all,
        queryFn: () => BusinessService.getBusinesses(),
        retry: false,
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });
}