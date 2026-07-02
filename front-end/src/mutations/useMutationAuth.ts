import { AuthService } from "@/services/AuthService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useRegisterUser(){
    const navigate = useNavigate();

    return useMutation({
        mutationFn: AuthService.register,
        onSuccess: (data: string) => {
            toast.success(data);
            navigate('/auth/login');
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });

}

export function useLoginUser(){
    const navigate = useNavigate();
    const QC = useQueryClient();

    return useMutation({
        mutationFn: AuthService.login,
        onSuccess: async (data) => {
            toast.success(data);
            await QC.invalidateQueries({ queryKey: ['user'] });
            navigate('/');
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });
}