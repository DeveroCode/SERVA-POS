import { Request, Response, NextFunction } from "express";
import { Business, IBusiness } from "../models/business";
import { body } from "express-validator";
import { USER_ROLES } from "../models/user";
import { Branch } from "../models/Branch";
import { Credential } from "../models/Credential";
import { MEMBER_ROLES } from "../models/Member";

declare global {
    namespace Express {
        interface Request {
            business: IBusiness;
            businesses: IBusiness[];
            businessStats: {
                activeBranches: number;
                employees: number;
                administrators: number;
            };
        }
    }
}

export async function existBusiness(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user._id;
        const { businessId } = req.params;

        const business = await Business.findOne({ _id: businessId, owner: userId })
            .select("-__v -createdAt -updatedAt -owner");

        if (!business) {
            const error = new Error('No existe un negocio con ese ID o no te pertenece.');
            return res.status(404).json({ message: error.message });
        }

        const branches = await Branch.find({
            business: businessId
        }).select("_id");

        const branchIds = branches.map(branch => branch._id);

        if (branchIds.length === 0) {
            req.business = business;
            req.businessStats = {
                activeBranches: 0,
                employees: 0,
                administrators: 0
            };
            return next();
        }

        const [employees, administrators] = await Promise.all([
            Credential.distinct("user", {
                branch: { $in: branchIds }
            }),
            Credential.distinct("user", {
                branch: { $in: branchIds },
                role: MEMBER_ROLES.ADMIN
            })
        ]);

        req.business = business;
        req.businessStats = {
            activeBranches: branches.length,
            employees: employees.length,
            administrators: administrators.length
        };

        next();

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function existBusinesses(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user._id;
        const businesses = await Business.find({ owner: userId })
            .select("-__v -createdAt -updatedAt -owner")
            .sort({ updatedAt: -1 });

        if (!businesses || businesses.length === 0) {
            const error = new Error('No tienes un negocio creado, crea uno primero.');
            return res.status(404).json({ message: error.message });
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

export const registerUserRules = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
    body("last_name")
        .trim()
        .notEmpty()
        .withMessage("El apellido es obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido debe tener entre 2 y 50 caracteres"),
    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("El correo electrónico no es válido"),
    body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("El número de teléfono es obligatorio"),
    body("role")
        .trim()
        .notEmpty()
        .withMessage("El rol es obligatorio")
        .isIn(Object.values(USER_ROLES))
        .withMessage("El rol no es válido"),
];