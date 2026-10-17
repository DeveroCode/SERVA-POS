import useBusinessContext from "@/hooks/useBusinessContext";
import { queryKeys } from "@/lib/queryKeys";
import { EmployeeService } from "@/services/EmployeeService";
import type { Branch, setActiveBranch } from "@/types/Branch.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useCredentialsEmployee() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: EmployeeService.createAccesToBranch,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate('/branch');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}

export function useSetIsActive() {
    const { currentBranchId,navigate, QC } = useBusinessContext();
    return useMutation({
        mutationFn: (isActive: setActiveBranch) => EmployeeService.setActiveBranch(isActive),
        onSuccess: (data) => {
            toast.success(data.message);
            QC.invalidateQueries({ queryKey: queryKeys.employee.oneBranch(currentBranchId) });
            navigate(`/branch`);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
}

export function useGetBrancAcces() {
    const navigate = useNavigate();
    const { currentBranchId } = useBusinessContext();
    return useMutation({
        mutationFn: (currentBranchId: Branch["_id"]) => EmployeeService.getBranchByID(currentBranchId),
        onSuccess: () => {
            toast.success('Acceso concedido, Bienvenido');
            navigate(`/branches/${currentBranchId}`);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}

export function useGetEmployees(page: number) {
    const { currentBranchId } = useBusinessContext();

    return useQuery({
        queryKey: queryKeys.employee.page(page),
        queryFn: () =>
            EmployeeService.getEmployees(page, currentBranchId),
        enabled: Boolean(currentBranchId && page),
    });
}

export function useSetScheduleBranch(){
    const {QC, currentBranchId} = useBusinessContext();

    return useMutation({
        mutationFn: EmployeeService.setScheduleBranch,
        onSuccess: (data) => {
            toast.success(data.message);
            QC.invalidateQueries({
                queryKey: queryKeys.employee.oneBranch(currentBranchId)
            });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}