import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { IBranch } from "./Branch";
import { ICategory } from "./Category";

export interface IProduct extends Document {
    name: string;
    branch: PopulatedDoc<IBranch>;
    category: PopulatedDoc<ICategory>;
    image: string;
    description: string;
    price: number;
    discount: number;
    discountPrice: number;
    ingredients: string[];
    available: boolean;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        branch: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
            required: true
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        image: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        discountPrice: {
            type: Number,
            default: 0,
            min: 0
        },

        ingredients: {
            type: [String],
            required: true
        },

        available: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model<IProduct>(
    "Product",
    ProductSchema
);