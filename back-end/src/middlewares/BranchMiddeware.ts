import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { Branch, IBranch } from "../models/Branch";

declare global {
    namespace Express {
        interface Request {
            branch: IBranch,
            branches: IBranch[]
        }
    }
}

export async function existBranch(req: Request, res: Response, next: NextFunction) {
    try {
        const { branchId } = req.params;
        const { _id: businessId } = req.business;

        const branch = await Branch.findById({ _id: branchId, business: businessId }).select("-__v -createdAt -updatedAt -business");

        if (!branch) {
            const error = new Error('No existe una sucursal con ese ID o no te pertenece.');
            return res.status(400).json({ message: error.message });
        }

        req.branch = branch;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export async function existBranches(req: Request, res: Response, next: NextFunction) {
    try {
        const { _id: businessId } = req.business;

        const branches = await Branch.find({ business: businessId }).select("-__v -createdAt -updatedAt -business");

        if (!branches) {
            const error = new Error('No existe una sucursal con ese ID o no te pertenece.');
            return res.status(400).json({ message: error.message });
        }

        req.branches = branches;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const createBranchRules = [
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
        .isLength({ max: 200 })
        .withMessage("La descripción no debe exceder los 200 caracteres"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("El correo electrónico es obligatorio")
        .isEmail()
        .withMessage("El correo electrónico no es válido"),
    body("phone")
        .trim()
        .notEmpty()
        .withMessage("El teléfono es obligatorio")
        .isMobilePhone("es-MX")
        .withMessage("El teléfono no es válido"),
    body("address.street")
        .trim()
        .notEmpty()
        .withMessage("La calle es obligatoria"),
    body("address.city")
        .trim()
        .notEmpty()
        .withMessage("La ciudad es obligatoria"),
    body("address.state")
        .trim()
        .notEmpty()
        .withMessage("El estado es obligatorio"),
    body("address.zipCode")
        .trim()
        .notEmpty()
        .withMessage("El código postal es obligatorio")
        .isPostalCode("MX")
        .withMessage("El código postal no es válido"),
    body("address.country")
        .trim()
        .notEmpty()
        .withMessage("El país es obligatorio")
        .isAlpha()
        .withMessage("El país no es válido"),
];


export const updateBranch = [
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
        .isLength({ max: 200 })
        .withMessage("La descripción no debe exceder los 200 caracteres"),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("El correo electrónico no es válido"),

    body("phone")
        .optional()
        .trim()
        .isMobilePhone("es-MX")
        .withMessage("El teléfono no es válido"),

    body("address.street")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("La calle es obligatoria"),

    body("address.city")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("La ciudad es obligatoria"),

    body("address.state")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El estado es obligatorio"),

    body("address.zipCode")
        .optional()
        .trim()
        .isPostalCode("MX")
        .withMessage("El código postal no es válido"),

    body("address.country")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El país es obligatorio")
        .isAlpha()
        .withMessage("El país no es válido"),
];