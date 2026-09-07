import { body } from "express-validator";
import { MEMBER_ROLES } from "../models/Member";

export const registerMemberRules = [
    body("name")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("El nombre es obligatorio"),

    body("last_name")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("El apellido es obligatorio"),

    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("El correo électronico no es valido"),

    body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("El número de teléfono es obligatorio")
];
export const updateMemberRules = [
    body("name")
        .trim()
        .isString()
        .optional()
        .notEmpty()
        .withMessage("El nombre es obligatorio"),

    body("last_name")
        .trim()
        .isString()
        .optional()
        .notEmpty()
        .withMessage("El apellido es obligatorio"),

    body("email")
        .trim()
        .optional()
        .normalizeEmail()
        .isEmail()
        .withMessage("El correo électronico no es valido"),

    body("phone_number")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El número de teléfono es obligatorio")
];
export const addMemberToBusinessRules = [
    body("role")
        .notEmpty()
        .withMessage("El rol es obligatorio")
        .isIn(Object.values(MEMBER_ROLES))
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

export const updateMemberCredentialsRules = [
    body("role")
        .optional()
        .isIn(Object.values(MEMBER_ROLES))
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

export const searchMember = [
    body("email")
        .trim()
        .optional()
        .normalizeEmail()
        .isEmail()
        .withMessage("El correo électronico no es valido"),
];