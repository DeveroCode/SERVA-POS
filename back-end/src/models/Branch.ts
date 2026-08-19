import mongoose, {Schema, Document, PopulatedDoc } from "mongoose";
import { IBusiness } from "./business";

export interface IBranch extends Document {
    name: string;
    slug: string;
    description?: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }
    business: PopulatedDoc<IBusiness>;
}

const BusinessSchema = new Schema<IBranch>({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: {
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        zipCode: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
    },
    business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
});

export const Branch = mongoose.model<IBranch>("Branch", BusinessSchema);