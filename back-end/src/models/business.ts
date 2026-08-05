import mongoose, {Document, Schema, PopulatedDoc} from "mongoose";
import { IUser } from "./user";

export interface IBusiness extends Document {
    owner: PopulatedDoc<IUser>;
    name: string; //
    slug: string; //
    logo?: string; ///
    coverImage?: string; ///
    colorCover?: string;
    description?: string; //
    email: string; //
    phone: string; //
    socialMedia: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
    }
}


const BusinessSchema = new Schema<IBusiness>({
    name: { type: String, required: true },
    slug: { type: String, required: false, defualt: "" },
    logo: { type: String, required: false, defualt: "" },
    coverImage: { type: String, required: false, defualt: "" },
    colorCover: { type: String, required: false, defualt: "" },
    description: { type: String, required: false, defualt: "" },
    email: { type: String, required: true },
    phone: { type: String, required: true, defualt: "" },
    socialMedia: {
        facebook: { type: String, required: false, defualt: "" },
        instagram: { type: String, required: false, defualt: "" },
        linkedin: { type: String, required: false, defualt: "" },
    },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
})


export const Business = mongoose.model<IBusiness>("Business", BusinessSchema);
export type UploadImageBusiness = {
    image: File
}
