import { queryKeys } from "@/lib/queryKeys";
import { BusinessService } from "@/services/BusinessService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useCreateBusiness(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: BusinessService.create,
        onSuccess: (data: string) => {
            toast.success(data);
            navigate('/dashboard/general');
            queryClient.invalidateQueries({ queryKey: queryKeys.bussines.all });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}