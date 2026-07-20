import { queryKeys } from "@/lib/queryKeys";
import { UserService } from "@/services/UserService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useChangePassword() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: UserService.changePassword,
        onSuccess: (message) => {
            toast.success(message);
            navigate("/profile/index");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

export function useUpdateUser(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: UserService.updateUser,
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
            navigate("/profile/index");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
}
export function useUploadImageProfile(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: UserService.updateImage,
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
            navigate("/profile/index");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
}