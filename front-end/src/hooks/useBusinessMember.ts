import { queryKeys } from "@/lib/queryKeys";
import { BusinessMemberService } from "@/services/BusinessMemberService";
import type { GetMemberById } from "@/types/Index.types";
import { SET_TOKEN_KEY } from "@/utils/key";
import { useQuery } from "@tanstack/react-query";

export function useBusinessMember({ memberId, _id }: GetMemberById) {
    const token = localStorage.getItem(SET_TOKEN_KEY);

    return useQuery({
        queryKey: queryKeys.bussiness.member(memberId, _id),
        queryFn: () => BusinessMemberService.getMember({ memberId, _id }),
        enabled: !!token && !!memberId && !!_id,
        retry: false,
        staleTime: 1000 * 60 * 10,
        // Delete the cache after 20 minutes of inactivity
        gcTime: 1000 * 60 * 20,

        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
}