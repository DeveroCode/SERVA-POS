import { queryKeys } from '@/lib/queryKeys';
import { SET_TOKEN_KEY } from '@/utils/key';
import { useQuery } from '@tanstack/react-query';
import useBusinessContext from './useBusinessContext';
import { EmployeeService } from '@/services/EmployeeService';

export function useEmployees(page: number) {
    const token = localStorage.getItem(SET_TOKEN_KEY);
    const { currentBranchId: branchId } = useBusinessContext();
    return useQuery({
        queryKey: queryKeys.employee.page(page),
        queryFn: () => EmployeeService.getEmployees(page, branchId),
        retry: false,
        enabled: !!token && !!branchId,
        staleTime: 1000 * 60 * 10,
        refetchInterval: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });
}