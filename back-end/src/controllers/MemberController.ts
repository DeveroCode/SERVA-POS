import { Request, Response } from "express";
import { Member, MEMBER_ROLES } from "../models/Member";
import { getPublicId } from "../utils";
import { v4 as uuid } from "uuid";
import cloudinary from "../config/cloudinary";

export class MemberController {
    static search = async (req: Request, res: Response) => {
        const foundMember = req.searchMember;
        try {
            return res.status(200).json({foundMember, message: "Miembro encontrado"});
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    static create = async (req: Request, res: Response) => {
        const { _id: businessId } = req.business;
        const { name, last_name, email, phone_number, role } = req.body;
        try {
            const existMember = await Member.findOne({ email, business: businessId });
            if (existMember) {
                const error = new Error("Ya existe un miembro con este correo electrónico en este negocio.");
                return res.status(400).json({ message: error.message });
            }

            const isValidRole = Object.values(MEMBER_ROLES).includes(role);
            if (!isValidRole) {
                const error = new Error("El rol no es válido.");
                return res.status(400).json({ message: error.message });
            }

            const newMember = new Member({
                name,
                last_name,
                email,
                phone_number,
                role,
                business: businessId,
            });
            await newMember.save();
            res.status(201).json({ message: "Miembro registrado correctamente" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static update = async (req: Request, res: Response) => {
        try {
            const member = req.member;

            const { name, last_name, email, phone_number, role } = req.body;
            member.name = name || member.name;
            member.last_name = last_name || member.last_name;
            member.email = email || member.email;
            member.phone_number = phone_number || member.phone_number;

            if (role !== member.role) {
                const isValidRole = Object.values(MEMBER_ROLES).includes(role);
                if (!isValidRole) {
                    const error = new Error("El rol no es válido.");
                    return res.status(400).json({ message: error.message });
                }
                member.role = role || member.role;
            }
            await member.save();
            res.status(200).json({ message: "Miembro actualizado correctamente" });

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const member = req.member;
            await member.deleteOne();

            return res.status(200).json({ message: "Miembro eliminado correctamente" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static uploadImage = async (req: Request, res: Response) => {
        try {
            const member = req.member;
            const file = Array.isArray(req.files.image)
                ? req.files.image[0]
                : req.files.image;

            if (!file) {
                return res.status(400).json({
                    message: "Debe seleccionar una imagen.",
                });
            }

            if (member.image) {
                try {
                    const publicId = getPublicId(member.image);
                    await cloudinary.uploader.destroy(publicId);
                } catch (error) {
                    console.error("Error deleting previous image:", error);
                }
            }

            const result = await cloudinary.uploader.upload(file.filepath, {
                public_id: uuid(),
                folder: "profile/users",
            });

            member.image = result.secure_url;

            await member.save();

            return res.status(200).json({
                message: "Foto de perfil actualizada correctamente.",
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}