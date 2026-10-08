import { Request, Response } from "express";
import { IBranch } from "../models/Branch";
import { IProduct, Product } from "../models/Products";
import { getPublicId } from "../utils";
import { v4 as uuid } from "uuid";
import cloudinary from "../config/cloudinary";

export class ProductController {
    static async getAll(req: Request, res: Response) {
        try {
            return res.status(200).json(req.products);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async get(req: Request, res: Response) {
        try {
            return res.status(200).json(req.product);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async create(req: Request, res: Response) {
        const branchId = req.branch?._id as IBranch["_id"];
        try {
            const { name, category, description, price, ingredients, available } = req.body;

            const existProduct = await Product.findOne({ name, branch: branchId });
            if (existProduct) {
                const error = new Error("Ya existe un producto con ese nombre.");
                return res.status(400).json({ message: error.message });
            }

            const newProduct = new Product({
                name,
                category,
                description,
                price,
                ingredients,
                available,
                branch: branchId
            });

            await newProduct.save();
            res.status(201).json(newProduct);

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    static async update(req: Request, res: Response) {
        try {
            const product = req.product as IProduct;
            const { name, category, description, price, ingredients, available } = req.body;

            product.name = name ?? product.name;
            product.category = category ?? product.category;
            product.description = description ?? product.description;
            product.ingredients = ingredients ?? product.ingredients;
            product.available = available ?? product.available;

            if (price !== undefined && price !== product.price) {
                product.price = price;

                if (product.discount > 0) {
                    product.discountPrice = Number(
                        (
                            product.price -
                            (product.price * product.discount) / 100
                        ).toFixed(2)
                    );
                }
            }

            await product.save();
            return res.status(200).json({ message: "Producto actualizado correctamente." });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const product = req.product as IProduct;
            await product.deleteOne();
            return res.status(200).json({ message: "Producto eliminado correctamente." });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async discountedProduct(req: Request, res: Response) {
        try {
            const product = req.product as IProduct;
            const { discount } = req.body;

            if (discount < 0 || discount > 100) {
                return res.status(400).json({
                    message: "El descuento debe estar entre 0 y 100."
                });
            }

            if (discount === 0) {
                product.discount = 0;
                product.discountPrice = 0;
            } else {
                const discountPrice = Number(
                    (
                        product.price -
                        (product.price * discount) / 100
                    ).toFixed(2)
                );

                product.discount = discount;
                product.discountPrice = discountPrice;
            }

            await product.save();

            return res.status(200).json({
                message: discount === 0
                    ? "Descuento eliminado correctamente."
                    : "Descuento aplicado correctamente."
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    static uploadProductImage = async (req: Request, res: Response) => {
        const product = req.product as IProduct;
        try {
            const file = Array.isArray(req.files.image)
                ? req.files.image[0]
                : req.files.image;

            if (!file) {
                return res.status(400).json({
                    message: "Debe seleccionar una imagen.",
                });
            }

            if (product.image) {
                try {
                    const publicId = getPublicId(product.image);
                    await cloudinary.uploader.destroy(publicId);
                } catch (error) {
                    console.error("Error deleting previous image:", error);
                }
            }

            const result = await cloudinary.uploader.upload(file.filepath, {
                public_id: uuid(),
                folder: "product",
            });

            product.image = result.secure_url;

            await product.save();

            return res.status(200).json({
                message: "Imagen cargada correctamente.",
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Internal server error",
            });
        }
    };
}