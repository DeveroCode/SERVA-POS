import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { EmployeeService } from "@/services/EmployeeService";
import { SET_TOKEN_KEY } from "@/utils/key";

export function useEmployeeBranches(page: number){
    const token = localStorage.getItem(SET_TOKEN_KEY);

    return useQuery({
        queryKey: queryKeys.employee.branchesPage(page),
        queryFn: () => EmployeeService.getBranches(),
        enabled: !!token,
        retry: false,
        staleTime: 1000 * 60 * 10,
        // Delete the cache after 20 minutes of inactivity
        gcTime: 1000 * 60 * 20,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })
}