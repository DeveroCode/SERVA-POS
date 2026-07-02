export * from './User.types.ts';

// Global Types
export type Response = {
    message: string
}

export type LoginResponse = Pick<Response, "message"> & {
    token: string
}