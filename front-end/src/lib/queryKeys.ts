import type { Branch, Business, Member } from "@/types/Index.types";

export const queryKeys = {
    auth: {
        me: ["auth", "me"] as const,
    },

    bussiness: {
        all: ["bussines", "all"] as const,

        one: (id: Business["_id"]) =>
            ["bussines", "one", id] as const,
        members: (id: Business["_id"]) => ["bussines", "members", id] as const,
        member: (businessId: Business["_id"], memberId: Member["_id"]) =>
            ["bussines", "memberId", businessId, memberId] as const,
    },

    branch: {
        all: ["branch", "all"] as const,

        byBusiness: (businessId: Business["_id"]) =>
            ["branch", "byBusiness", businessId] as const,

        one: (
            businessId: Business["_id"],
            branchId: Branch["_id"]
        ) =>
            ["branch", "one", businessId, branchId] as const,
    },
};