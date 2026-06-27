import { Request, Response } from 'express';
import { User } from '../models/user';
import { checkPassword, hashPassword } from '../utils';
import { generateJWT } from '../utils/generateJWT';

export class UserController {
    static create = async (req: Request, res: Response) => {
        const { phone_number, email, password, role } = req.body;
        try {
            const findUser = await User.findOne({ where: { email, phone_number } });
            if (findUser) {
                const error = new Error('Email or phone number already exists, please try again');
                return res.status(400).json({ message: error.message });
            }

            const user = await User.create({ phone_number, email, role });
            user.password = await hashPassword(password);
            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static update = async (req: Request, res: Response) => {
        const { name, last_name, email, phone_number, password } = req.body;
        const user = req.user; // Assuming you have a middleware that sets req.user to the authenticated user
        try {
            user.name = name || user.name;
            user.last_name = last_name || user.last_name;
            user.email = email || user.email;
            user.phone_number = phone_number || user.phone_number;
            if (password) {
                user.password = await hashPassword(password);
            }
            await user.save();
            res.status(200).json({ message: 'User updated successfully' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static login = async (req: Request, res: Response) => {
        const { password } = req.body;
      try {
        const passwordMatch = await checkPassword(password, req.user.password);
        if(!passwordMatch){
            const error = new Error('Invalid password');
            return res.status(400).json({ message: error.message });
        }
        const token = generateJWT({ id: req.user._id });
        res.status(200).json({ message: `Welcome ${req.user.name}`, token });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
}