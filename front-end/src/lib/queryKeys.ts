import type { Business } from "@/types/Index.types";

export const queryKeys = {
    auth: {
        me: ["auth", "me"] as const,
    },
    bussiness: {
        all: ["bussines", "all"] as const,
        one: (id: Business["_id"]) => ["bussines", "one", id] as const
    }
};