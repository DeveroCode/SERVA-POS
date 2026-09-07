import { queryKeys } from "@/lib/queryKeys";
import { BusinessMemberService } from "@/services/BusinessMemberService";
import type { GetMemberById } from "@/types/Index.types";
import { LAST_BUSINESS_KEY, SET_TOKEN_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";

export function useBusinessMember({memberId, _id}: GetMemberById){
    const token = localStorage.getItem(SET_TOKEN_KEY);
    const business = localStorage.getItem(LAST_BUSINESS_KEY) || _id;

    return useQuery({
        queryKey: queryKeys.bussiness.member(business, memberId),
        queryFn: () => BusinessMemberService.getMember({ _id, memberId }),
        enabled: !!token && !!memberId && !!business,
        retry: false,
        staleTime: 1000 * 60 * 10,
        // Delete the cache after 20 minutes of inactivity
        gcTime: 1000 * 60 * 20,

        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
}