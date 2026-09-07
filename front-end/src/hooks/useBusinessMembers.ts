import { queryKeys } from "@/lib/queryKeys";
import { BusinessMemberService } from "@/services/BusinessMemberService";
import type { GetMemberByBusiness } from "@/types/Index.types";
import { LAST_BUSINESS_KEY, SET_TOKEN_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";

export function useBusinessMembers(businessId: GetMemberByBusiness["_id"]){
    const token = localStorage.getItem(SET_TOKEN_KEY);
    const business = localStorage.getItem(LAST_BUSINESS_KEY) || businessId;

    return useQuery({
        queryKey: queryKeys.bussiness.members(business),
        queryFn: () => BusinessMemberService.getMembers(businessId),
        retry: false,
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });
}