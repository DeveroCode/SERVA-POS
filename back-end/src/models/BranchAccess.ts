
import mongoose, { Schema, Types, Document, PopulatedDoc } from "mongoose";
import { IMember } from "./Member";
import { IBranch } from "./Branch";

export interface IBranchSession extends Document {
    member: PopulatedDoc<IMember>;
    branch: PopulatedDoc<IBranch>;
    tokenHash: string;
    expiresAt: Date;
}

const branchSessionSchema = new Schema<IBranchSession>(
    {
        member: {
            type: Schema.Types.ObjectId,
            ref: "Member",
            required: true,
        },
        branch: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },
        tokenHash: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

branchSessionSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

branchSessionSchema.index(
    { member: 1, branch: 1, tokenHash: 1 },
    { unique: true }
);

export const BranchSession = mongoose.model<IBranchSession>(
    "BranchSession",
    branchSessionSchema
);
