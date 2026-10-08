import mongoose, { Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    icon?: string;
    isActive: boolean;
}

const CategorySchema = new mongoose.Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        icon: {
            type: String,
            required: false,
            trim: true,
        },

        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

CategorySchema.index({ isActive: 1 });

export const Category = mongoose.model<ICategory>(
    "Category",
    CategorySchema
);