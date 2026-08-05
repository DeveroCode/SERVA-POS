import { Request, Response, NextFunction } from "express";
import { IUser, User } from "../models/user";
import { body } from "express-validator";
import jwt from 'jsonwebtoken';
import { Files } from "formidable";

declare global {
    namespace Express {
        interface Request {
            user: IUser;
            files: Files;
        }
    }
}

export const userExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            const error = new Error('User not found');
            return res.status(404).json({ message: error.message });
        }

        req.user = findUser;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function isAuthenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        const error = new Error('No token provided');
        return res.status(401).json({ message: error.message });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        const user = await User.findById(decoded.id).select('-password -__v -createdAt -updatedAt');
        if (user) {
            req.user = user;
        } else {
            const error = new Error('User not found');
            return res.status(404).json({ message: error.message });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export const createUser = [
    body('name')
        .isString()
        .withMessage('El nombre debe ser una cadena de texto'),

    body('email')
        .isEmail()
        .withMessage('El correo electrónico no es válido'),

    body('role')
        .isIn(['admin', 'user'])
        .withMessage('El rol debe ser "admin" o "user"'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres')
];

export const updateUser = [
    body('name')
        .optional()
        .isString()
        .withMessage('El nombre debe ser una cadena de texto'),

    body('last_name')
        .optional()
        .isString()
        .withMessage('El apellido debe ser una cadena de texto'),

    body('email')
        .optional()
        .isEmail()
        .withMessage('El correo electrónico no es válido'),

    body('phone_number')
        .optional()
        .isMobilePhone('any')
        .withMessage('El número de teléfono no es válido'),

    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body("birthday")
        .optional()
        .isISO8601()
        .withMessage("La fecha de nacimiento no es válida")
        .toDate()
        .custom((value: Date) => {
            const today = new Date();

            let age = today.getFullYear() - value.getFullYear();
            const monthDiff = today.getMonth() - value.getMonth();

            if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < value.getDate())
            ) {
                age--;
            }

            if (age < 18) {
                throw new Error("La edad debe ser mayor o igual a 18");
            }

            return true;
        }),
];

export const loginUser = [
    body('email')
        .isEmail()
        .withMessage('El correo electrónico no es válido'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
];

export const updatePassword = [
    body('currentPassword').notEmpty().withMessage('La contraseña actual es obligatoria'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres')
];