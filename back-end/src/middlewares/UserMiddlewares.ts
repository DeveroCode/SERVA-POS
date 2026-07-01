import { Request, Response, NextFunction } from "express";
import { IUser, User } from "../models/user";
import { body } from "express-validator";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

export const userExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, phone_number } = req.body;
        const findUser = await User.findOne({ where: { email, phone_number } });
        if(!findUser) {
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
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Invalid email'),
    body('role').isIn(['admin', 'user']).withMessage('Role must be either admin or user'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

export const updateUser = [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('last_name').optional().isString().withMessage('Last name must be a string'),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('phone_number').optional().isMobilePhone('any').withMessage('Invalid phone number'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

export const loginUser = [
    body('email').isEmail().withMessage('Invalid email'),
    body('phone_number').isMobilePhone('any').optional().withMessage('Invalid phone number'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];