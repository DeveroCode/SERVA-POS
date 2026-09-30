import { queryKeys } from "@/lib/queryKeys";
import { BusinessMemberService } from "@/services/BusinessMemberService";
import type { GetMemberByBusiness } from "@/types/Index.types";
import { SET_TOKEN_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";

export function useBusinessMembers(businessId: GetMemberByBusiness["_id"], page: number) {
    const token = localStorage.getItem(SET_TOKEN_KEY);

    return useQuery({
        queryKey: queryKeys.bussiness.members(businessId, page),
        queryFn: () => BusinessMemberService.getMembers(businessId, page),
        retry: false,
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });
}