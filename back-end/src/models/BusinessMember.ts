import mongoose, { Document, Schema, PopulatedDoc } from "mongoose";
import { IBusiness } from "./business";
import { IUser } from "./user";

export const BRANCH_MEMBER_ROLE = {
    OWNER: "owner",
    ADMIN: "admin",
    USER: "user",
} as const;

export interface IBusinessMember extends Document {
    business: PopulatedDoc<IBusiness>;
    user: PopulatedDoc<IUser>;
    role: typeof BRANCH_MEMBER_ROLE[keyof typeof BRANCH_MEMBER_ROLE];
}

const BusinessMemberSchema = new Schema<IBusinessMember>(
    {
        business: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: Object.values(BRANCH_MEMBER_ROLE),
        },
    },
    {
        timestamps: true,
    }
);


export const BusinessMember = mongoose.model<IBusinessMember>(
    "BusinessMember",
    BusinessMemberSchema
);