import type { Branch, Business, Member } from "@/types/Index.types";

export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },

  bussiness: {
    all: ["bussines", "all"] as const,
    page: (page: number) => ["bussines", "page", page] as const,
    one: (id: Business["_id"]) =>
      ["bussines", "one", id] as const,

    members: {
      all: (businessId: Business["_id"]) =>
        ["bussines", "members", businessId] as const,

      page: (
        businessId: Business["_id"],
        page: number
      ) =>
        ["bussines", "members", businessId, page] as const,
    },

    member: (
      businessId: Business["_id"],
      memberId: Member["_id"]
    ) =>
      ["bussines", "member", businessId, memberId] as const,

    credentials: (
      businessId: Business["_id"],
      branchId: Branch["_id"],
      memberId: Member["_id"]
    ) =>
      ["bussines", "credentials", businessId, branchId, memberId] as const,
  },

  branch: {
    all: ["branch", "all"] as const,
    page: (page: number) => ["branch", "page", page] as const,

    byBusiness: (businessId: Business["_id"]) =>
      ["branch", "byBusiness", businessId] as const,

    one: (
      businessId: Business["_id"],
      branchId: Branch["_id"]
    ) =>
      ["branch", "one", businessId, branchId] as const,
  },
};
