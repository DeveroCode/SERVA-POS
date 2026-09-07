import mongoose, { Document, Schema, PopulatedDoc } from "mongoose";
import { IBusiness } from "./business";

export const MEMBER_ROLES = {
    OWNER: "owner",
    ADMIN: "admin",
    MANAGER: "manager",
    STAFF: "staff"
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
    business: PopulatedDoc<IBusiness>;
    role: MemberRoles
}

const memberSchema = new Schema<IMember>({
    name: { type: String, required: true },
    last_name: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: false, default: "" },
    image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: Date.now() },
    business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    role: { type: String, required: true, enum: Object.values(MEMBER_ROLES) },
});

memberSchema.index({ business: 1, email: 1 }, { unique: true });

export const Member = mongoose.model<IMember>("Member", memberSchema);