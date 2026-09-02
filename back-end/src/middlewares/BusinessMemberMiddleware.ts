import { Request, Response, NextFunction } from "express";
import { BusinessMember, IBusinessMember } from "../models/BusinessMember";
import { body } from "express-validator";
import { USER_ROLES } from "../models/user";

declare global {
    namespace Express {
        interface Request {
            members: IBusinessMember[];
            member: IBusinessMember;
        }
    }
}

export async function existMember(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { _id: businessId } = req.business;
        const { userId } = req.params;

        const existMemberInBusiness = await BusinessMember.findOne({
            user: userId,
            business: businessId
        })
            .populate({
                path: "business",
                select: "name -_id"
            })
            .populate({
                path: "user",
                select: "name last_name email phone_number image lastLogin isActive"
            }).select("role");

        if (!existMemberInBusiness) {
            const error = new Error("El usuario no pertenece al negocio.");
            return res.status(400).json(error.message);
        }

        req.member = existMemberInBusiness;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function existMembers(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { _id: businessId } = req.business;
        const { userId } = req.params;

        const existMembersInBusiness = await BusinessMember.find({
            userId,
            business: businessId
        })
            .populate({
                path: "business",
                select: "name -_id"
            })
            .populate({
                path: "user",
                select: "name last_name email phone_number image lastLogin isActive"
            }).select("role");

        if (!existMembersInBusiness.length) {
            const error = new Error("El usuario no pertenece al negocio.");
            return res.status(400).json(error.message);
        }

        req.members = existMembersInBusiness;

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const addMemberToBusinessRules = [
    body("userId")
        .notEmpty()
        .withMessage("El usuario es obligatorio")
        .isMongoId()
        .withMessage("El usuario no es válido"),

    body("role")
        .notEmpty()
        .withMessage("El rol es obligatorio")
        .isIn(Object.values(USER_ROLES))
        .withMessage("El rol no es válido"),

    body("userKey")
        .trim()
        .notEmpty()
        .withMessage("El userKey es obligatorio"),

    body("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")
];

export const updateMemberRules = [
    body("role")
        .optional()
        .isIn(Object.values(USER_ROLES))
        .withMessage("El rol no es válido"),

    body("userKey")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El userKey no puede estar vacío"),

    body("password")
        .optional()
        .notEmpty()
        .withMessage("La contraseña no puede estar vacía")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")

];