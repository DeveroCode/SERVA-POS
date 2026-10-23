import mongoose, { Document, Schema, PopulatedDoc } from "mongoose";
import { IBusiness } from "./business";

export const MEMBER_ROLES = {
    OWNER: "owner",
    ADMIN: "admin",
    MANAGER: "manager",
    STAFF: "staff",
    EMPLOYEE: "employee"
};

export type MemberRoles = typeof MEMBER_ROLES[keyof typeof MEMBER_ROLES];

export interface IMember extends Document {
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    image: string;
    isActive: boolean;
    lastLogin: Date;
    role: MemberRoles;
    business: PopulatedDoc<IBusiness>;
}
export type BranchEmployee = Pick<
    IMember,
    | "name"
    | "last_name"
    | "email"
    | "phone_number"
    | "image"
    | "isActive"
    | "lastLogin"
    | "role"
> & {
    _id: string;
};

const memberSchema = new Schema<IMember>({
    name: { type: String, required: true },
    last_name: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: false, default: "" },
    image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    role: { type: String, required: false, enum: Object.values(MEMBER_ROLES) },
    lastLogin: { type: Date, default: Date.now() },
    business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
}, { timestamps: true });

memberSchema.index({ business: 1, email: 1 }, { unique: true });

export const Member = mongoose.model<IMember>("Member", memberSchema);