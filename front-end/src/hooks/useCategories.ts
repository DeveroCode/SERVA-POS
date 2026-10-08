import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { EmployeeService } from "@/services/EmployeeService";
import { SET_TOKEN_KEY } from "@/utils/key";
export function useCategories(){
    const token = localStorage.getItem(SET_TOKEN_KEY);
    return useQuery({
        queryKey: queryKeys.categories.all,
        queryFn: () => EmployeeService.getCategories(),
        retry: false,
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });
}