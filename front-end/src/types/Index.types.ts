import type { ReactNode } from "react";

export * from './User.types.ts';
export * from './Business.types.ts';
export * from './Branch.types.ts';
export * from './Member.types.ts';
export * from './BusinessMember.type.ts';
export * from './Pagination.type.ts';
export * from './Order.type.ts';
export * from './Employee.type.ts';

// Global Types
export type Response = {
    message: string
}


export type LoginResponse = Pick<Response, "message"> & {
    token: string
}

export interface SidebarItem {
    type: "link";
    title: string;
    url: string;
    icon: ReactNode;
    macro?: MacroKey
}

export type UploadImage = {
    image: File
}

export type MacroKey =
    | "NEW_BRANCH"
    | "POS"
    | "GENERAL_ROLES"
    | "SAAS_BILLING"
    | "NEW_PERSONNEL"
    | "LOGOUT";