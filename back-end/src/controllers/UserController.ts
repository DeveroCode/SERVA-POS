import { Request, Response } from 'express';
import { User } from '../models/user';
import { checkPassword, getPublicId, hashPassword } from '../utils';
import { generateJWT } from '../utils/generateJWT';
import { v4 as uuid } from 'uuid';
import cloudinary from '../config/cloudinary';

export class UserController {
    static getMe = async (req: Request, res: Response) => {
        try {
            return res.status(200).json(req.user);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    static create = async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body;
        try {
            const findUser = await User.findOne({ where: { email } });
            if (findUser) {
                const error = new Error('Este correo ya se encuentra registrado, por favor ingrese otro.');
                return res.status(400).json({ message: error.message });
            }

            const user = new User({ email, role, name });
            user.password = await hashPassword(password);
            await user.save();
            res.status(201).json({ message: 'Usuario registrado correctamente' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static update = async (req: Request, res: Response) => {
        const { name, last_name, email, phone_number, birthday } = req.body;
        const user = req.user; // Assuming you have a middleware that sets req.user to the authenticated user
        try {
            user.name = name || user.name;
            user.last_name = last_name || user.last_name;
            user.email = email || user.email;
            user.phone_number = phone_number || user.phone_number;
            user.birthday = birthday || user.birthday;
            await user.save();
            res.status(200).json({ message: 'El usuario se ha actualizado correctamente' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static updatePassword = async (req: Request, res: Response) => {
        const { password, currentPassword } = req.body;
        const user = await User.findById(req.user._id);
        try {
            const passwordMatch = await checkPassword(currentPassword, user.password);
            if (!passwordMatch) {
                const error = new Error('Las contraseña actual es incorrecta, por favor comunicate con SERVA, o intenta nuevamente');
                return res.status(400).json({ message: error.message });
            }
            user.password = await hashPassword(password);
            await user.save();
            res.status(200).json({ message: 'La contraseña se ha actualizado correctamente' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static uploadImageProfile = async (req: Request, res: Response) => {
        const user = req.user;
        try {
            const file = Array.isArray(req.files.image)
                ? req.files.image[0]
                : req.files.image;

            if (!file) {
                return res.status(400).json({
                    message: "Debe seleccionar una imagen.",
                });
            }

            if (user.image) {
                try {
                    const publicId = getPublicId(user.image);
                    await cloudinary.uploader.destroy(publicId);
                } catch (error) {
                    console.error("Error deleting previous image:", error);
                }
            }

            const result = await cloudinary.uploader.upload(file.filepath, {
                public_id: uuid(),
                folder: "profile/users",
            });

            user.image = result.secure_url;

            await user.save();

            return res.status(200).json({
                message: "Foto de perfil actualizada correctamente.",
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Internal server error",
            });
        }
    };

    static login = async (req: Request, res: Response) => {
        const { password } = req.body;
        try {
            const passwordMatch = await checkPassword(password, req.user.password);
            if (!passwordMatch) {
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