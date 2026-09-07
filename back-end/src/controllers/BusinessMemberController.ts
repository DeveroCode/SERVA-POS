import { Request, Response } from "express";
import { Credential } from "../models/Credential";
import { hashPassword } from "../utils";
import { USER_ROLES } from "../models/user";
import { Member, MEMBER_ROLES } from "../models/Member";

export class BusinessMemberController {
    static members = async (req: Request, res: Response) => {
        try {
            return res.status(200).json(req.members);
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    };

    static member = async (req: Request, res: Response) => {
        try {
            return res.status(200).json(req.member);
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    };

    static add = async (req: Request, res: Response) => {
        try {
            const { _id: branch } = req.branch;
            const { _id: userId } = req.member;

            const {
                role,
                password,
                userKey
            } = req.body;

            const isValidRole = Object.values(MEMBER_ROLES).includes(role);

            if (!isValidRole) {
                const error = new Error("El rol proporcionado no es valido");
                return res.status(400).json({ message: error.message });
            }

            const existMemberWithThisKey = await Credential.findOne({
                user: userId,
                branch
            });

            if (existMemberWithThisKey) {
                const error = new Error(
                    "Ya existe un miembro con esta llave de acceso"
                );
                return res.status(400).json({ message: error.message });
            }

            const memberCredentials = new Credential({
                user: userId,
                userKey,
                branch,
                role,
                password: await hashPassword(password)
            });

            await memberCredentials.save();
            return res.status(201).json({
                message: "Miembro agregado correctamente al negocio"
            });

        } catch (e) {
            console.error(e);

            return res.status(500).json({
                message: "Internal server error"
            });
        }
    };

    static updateMemberCredentials = async (req: Request, res: Response) => {
        try {
            const member = req.member;
            const { _id: branch } = req.branch;

            const { role, userKey, password } = req.body;

            const validRoles = Object.values(MEMBER_ROLES);

            if (!validRoles.includes(role)) {
                return res.status(400).json({
                    message: "El rol proporcionado no es válido"
                });
            }

            const credentials = await Credential.findOne({
                user: member._id,
                branch
            });

            if (!credentials) {
                return res.status(404).json({
                    message: "No se encontraron las credenciales del miembro en esta sucursal"
                });
            }

            credentials.role = role || credentials.role;
            credentials.userKey = userKey || credentials.userKey;

            if (password) {
                credentials.password = await hashPassword(password);
            }

            await credentials.save();

            return res.status(200).json({
                message: "Miembro actualizado correctamente"
            });

        } catch (e) {
            console.error(e);

            return res.status(500).json({
                message: "Internal server error"
            });
        }
    };
    static deleteMember = async (req: Request, res: Response) => {
        try {
            const member = req.member;

            await Promise.all([
                Member.findByIdAndDelete(member._id),
                Credential.findOneAndDelete({
                    email: member.email,
                    branch: req.branch._id
                })
            ]);

            return res.status(200).json({
                message: "Miembro eliminado correctamente"
            });

        } catch (e) {
            console.error(e);

            return res.status(500).json({
                message: "Internal server error"
            });
        }
    };
}