import mongoose, { Document, Schema } from "mongoose";
export const USER_ROLES = {
    OWNER: "owner",
    ADMIN: "admin",
    USER: "user"
}

export type UserRoles = typeof USER_ROLES[keyof typeof USER_ROLES];
export interface IUser extends Document {
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    role: typeof USER_ROLES[keyof typeof USER_ROLES];
    birthday: Date;
    image: string;
    isActive: boolean;
    lastLogin: Date;
}


const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    last_name: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: false, default: "" },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(USER_ROLES) },
    birthday: { type: Date, required: false, default: Date.now() },
    image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: Date.now() },
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", userSchema);