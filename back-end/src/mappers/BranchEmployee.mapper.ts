
import type { IMember, BranchEmployee } from "../models/Member";

interface MemberData extends Pick<
    IMember,
    | "name"
    | "last_name"
    | "email"
    | "phone_number"
    | "image"
    | "isActive"
    | "lastLogin"
> {
    _id: { toString(): string };
}

interface CredentialData {
    role: BranchEmployee["role"];
}

export const toBranchEmployee = (
    member: MemberData,
    credential: CredentialData
): BranchEmployee => ({
    _id: member._id.toString(),
    name: member.name,
    last_name: member.last_name,
    email: member.email,
    phone_number: member.phone_number,
    image: member.image,
    isActive: member.isActive,
    lastLogin: member.lastLogin,
    role: credential.role,
});
