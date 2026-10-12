import useBusinessContext from "@/hooks/useBusinessContext";
import { EmployeeService } from "@/services/EmployeeService";
import type { Branch } from "@/types/Branch.types";
import { useMutation } from "@tanstack/react-query";
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