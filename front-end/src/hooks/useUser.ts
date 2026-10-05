import { queryKeys } from "@/lib/queryKeys";
import { AuthService } from "@/services/AuthService";
import { GET_TOKEN_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
    const token = localStorage.getItem(GET_TOKEN_KEY);
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