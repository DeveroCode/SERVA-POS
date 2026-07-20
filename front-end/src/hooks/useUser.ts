import { queryKeys } from "@/lib/queryKeys";
import { AuthService } from "@/services/AuthService";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
    const token = localStorage.getItem('token');
    return useQuery({
        queryKey: queryKeys.auth.me,
        queryFn: () => AuthService.getMe(),
        retry: false,
        staleTime: 1000 * 60 * 10,
        enabled: !!token,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    })
}