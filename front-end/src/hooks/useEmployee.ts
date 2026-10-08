import { queryKeys } from "@/lib/queryKeys";
import { EmployeeService } from "@/services/EmployeeService";
import type { Member } from "@/types/Member.types";
import { SET_TOKEN_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";

export function useEmployee(id: Member["_id"]) {
    const token = localStorage.getItem(SET_TOKEN_KEY);

    return useQuery({
        queryKey: queryKeys.employee.oneBranch(id),
        queryFn: () => EmployeeService.getBranchByID(id),
        enabled: !!token && !!id,
        retry: false,
        staleTime: 1000 * 60 * 10,
        // Delete the cache after 20 minutes of inactivity
        gcTime: 1000 * 60 * 20,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })
}