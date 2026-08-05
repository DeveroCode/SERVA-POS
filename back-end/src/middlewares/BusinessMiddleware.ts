import { Request, Response, NextFunction } from "express";
import { Business, IBusiness } from "../models/business";
import { body } from "express-validator";


declare global {
    namespace Express {
        interface Request {
            business: IBusiness;
            businesses: IBusiness[];
        }
    }
}

export async function existBusiness(req: Request, res: Response, next: NextFunction) {
    try {
        const { _id } = req.user._id;
        const { businessId } = req.params;

        const business = await Business.findById({ _id: businessId, owner: _id })
            .select("-__v -createdAt -updatedAt -owner");

        if (!business) {
            const error = new Error('No existe un negocio con ese ID o no te pertenece.');
            return res.status(400).json({ message: error.message });
        }

        req.business = business;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export async function existBusinesses(req: Request, res: Response, next: NextFunction) {
    try {
        const { _id } = req.user._id;
        const businesses = await Business.find({ owner: _id })
            .select("-__v -createdAt -updatedAt -owner");

        if (!businesses) {
            const error = new Error('No tienes un negocio creado, crea uno primero.');
            return res.status(400).json({ message: error.message });
        }

        req.businesses = businesses;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const createBusinessRules = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ min: 3, max: 100 })
        .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

    body("slug")
        .trim()
        .notEmpty()
        .withMessage("El slug es obligatorio")
        .isSlug()
        .withMessage("El slug no es válido"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("La descripción no puede superar los 500 caracteres"),
    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("El correo electrónico no es válido"),
    body("phone")
        .trim()
        .isMobilePhone("any")
        .withMessage("El número de teléfono no es válido"),
];


export const updateBusiness = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("El nombre debe tener entre 3 y 100 caracteres"),
    body("slug")
        .optional()
        .trim()
        .isSlug()
        .withMessage("El slug no es válido"),
    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("La descripción no puede superar los 500 caracteres"),
    body("email")
        .optional()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("El correo electrónico no es válido"),
    body("phone")
        .optional()
        .trim()
        .isMobilePhone("any")
        .withMessage("El número de teléfono no es válido"),
];