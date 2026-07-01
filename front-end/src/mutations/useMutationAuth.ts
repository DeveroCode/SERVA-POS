import { AuthService } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
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