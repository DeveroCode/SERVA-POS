import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { paginate, PaginationResult } from "../lib/pagination";
import { IProduct, Product } from "../models/Products";
import { IBranch } from "../models/Branch";

declare global {
    namespace Express {
        interface Request {
            products: PaginationResult<IProduct>;
            product: IProduct;
        }
    }
}

export const existProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { productId } = req.params;
        const branchId = req.branch?._id as IBranch["_id"];

        const findProduct = await Product.findOne({
            _id: productId,
            branch: branchId
        })
            .select(
                "name image description price discount discountPrice ingredients available"
            )
            .populate("category", "name _id")
            .populate("branch", "name")
            .lean();

        if (!findProduct) {
            return res.status(404).json({
                message: "No existe un producto con ese ID."
            });
        }

        req.product = findProduct;
        next();

    } catch (error) {
        next(error);
    }
};

export const findProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const branchId = req.branch?._id as IBranch["_id"];

        const result = await paginate(
            Product,
            {
                branch: branchId
            },
            {
                page: req.query.page,
                sort: { updatedAt: -1 },
                select:
                    "name image description price discount discountPrice ingredients available",
                populate: {
                    path: "category",
                    select: "name _id"
                }
            }
        );

        req.products = result;
        next();

    } catch (error) {
        next(error);
    }
};

export const createProductRules = [
    body("name")
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

    body("category")
        .isString()
        .withMessage("La categoría debe ser una cadena de texto"),

    body("description")
        .isString()
        .withMessage("La descripción debe ser una cadena de texto"),

    body("price")
        .isNumeric()
        .withMessage("El precio debe ser un número"),

    body("ingredients")
        .isArray()
        .withMessage("Los ingredientes deben ser un arreglo"),

    body("ingredients.*")
        .isString()
        .trim()
        .withMessage("Cada ingrediente debe ser una cadena de texto"),

    body("available")
        .isBoolean()
        .withMessage("El disponible debe ser un booleano"),
];

export const updateProductRules = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

    body("category")
        .optional()
        .isString()
        .withMessage("La categoría debe ser una cadena de texto"),

    body("description")
        .optional()
        .isString()
        .withMessage("La descripción debe ser una cadena de texto"),

    body("price")
        .optional()
        .isNumeric()
        .withMessage("El precio debe ser un número"),

    body("ingredients")
        .optional()
        .isArray()
        .withMessage("Los ingredientes deben ser un arreglo"),

    body("ingredients.*")
        .optional()
        .isString()
        .trim()
        .withMessage("Cada ingrediente debe ser una cadena de texto"),

    body("available")
        .optional()
        .isBoolean()
        .withMessage("El disponible debe ser un booleano"),
];

export const setDisccountRules = [
    body("discount")
        .isNumeric()
        .withMessage("El descuento debe ser un número")
        .custom((value) => value >= 0 && value <= 100)
        .withMessage("El descuento debe estar entre 0 y 100")
];