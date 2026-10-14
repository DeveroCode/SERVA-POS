import type { Branch, Business, Category, Member, Product } from "@/types/Index.types";

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
  employee: {
    all: ["employee", "all"] as const,
    page: (
      page: number
    ) =>
      ["employee", "page", page] as const,
    one: (id: Member["_id"]) =>
      ["employee", "one", id] as const,
    oneBranch: (branchId: Branch["_id"]) =>
      ["employee", "oneBranch", branchId] as const,
    branchesPage: (page: number) =>
      ["employee", "branches", "page", page] as const,
    branches: () => ["employee", "branches", "all"] as const,
  },

  branch: {
    all: ["branch", "all"] as const,
    page: (
      businessId: Business["_id"],
      page: number
    ) =>
      ["branch", "page", businessId, page] as const,

    byBusiness: (businessId: Business["_id"]) =>
      ["branch", "byBusiness", businessId] as const,

    one: (
      businessId: Business["_id"],
      branchId: Branch["_id"]
    ) =>
      ["branch", "one", businessId, branchId] as const,
  },
  categories: {
    all: ["categories", "all"] as const,
    one: (id: Category["_id"]) => ["categories", "one", id] as const,
  },
  products: {
    all: (branchId: Branch["_id"]) =>
      ["products", branchId, "all"] as const,

    page: (branchId: Branch["_id"], page: number) =>
      ["products", branchId, "page", page] as const,

    one: (branchId: Branch["_id"], productId: Product["_id"]) =>
      ["products", branchId, "one", productId] as const,
  },
};
