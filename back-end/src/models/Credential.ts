import mongoose, { Document, Schema, PopulatedDoc } from "mongoose";
import { IUser } from "./user";
import { IBranch } from "./Branch";

export interface ICredential extends Document {
    user: PopulatedDoc<IUser>;
    branch: PopulatedDoc<IBranch>;
    userKey: string;
    password: string;
}

const credentialSchema = new Schema<ICredential>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
    },
    userKey: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
});

credentialSchema.index({ user: 1, branch: 1 }, { unique: true });
export const Credential = mongoose.model<ICredential>("Credential", credentialSchema);