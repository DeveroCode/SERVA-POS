import type { ReactNode } from "react";

export * from './User.types.ts';

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
}