import mongoose, { Document, Schema } from "mongoose";
export const USER_ROLES = {
    OWNER: "owner",
    ADMIN: "admin",
    USER: "user",
    CASHIER: "cashier",
    MANAGER: "manager",
}
export interface IUser extends Document {
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    role: typeof USER_ROLES[keyof typeof USER_ROLES];
    image: string;
    isActive: boolean;
    lastLogin: Date;
}


const userSchema = new Schema<IUser>({
    name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(USER_ROLES) },
    image: { type: String, },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: Date.now() },
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", userSchema);