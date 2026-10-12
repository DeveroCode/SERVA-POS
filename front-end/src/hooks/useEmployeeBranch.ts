import { GET_TOKEN_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { EmployeeService } from "@/services/EmployeeService";
import type { Branch } from "@/types/Branch.types";

export function useEmployeeBranch(id: Branch["_id"]) {
    const token = localStorage.getItem(GET_TOKEN_KEY);
    return useQuery({
        queryKey: queryKeys.employee.oneBranch(id),
        queryFn: () => EmployeeService.getBranchByID(id),
        enabled: !!token && !!id,
        retry: false,
        staleTime: 1000 * 60 * 10,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
}