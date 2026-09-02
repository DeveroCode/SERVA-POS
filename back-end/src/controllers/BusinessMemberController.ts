import { Request, Response } from "express";

import { BusinessMember } from "../models/BusinessMember";
import { Credential } from "../models/Credential";

import { hashPassword } from "../utils";
import { USER_ROLES } from "../models/user";

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
            const { _id: business } = req.business;
            const { _id: branch } = req.branch;

            const {
                userId,
                role,
                password,
                userKey
            } = req.body;

            const businessMember = new BusinessMember({
                business,
                user: userId,
                role
            });

            const memberCredentials = new Credential({
                user: userId,
                userKey,
                branch,
                password: await hashPassword(password)
            });

            await Promise.all([
                businessMember.save(),
                memberCredentials.save()
            ]);

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

    static updateMember = async (req: Request, res: Response) => {
        try {

            const member = req.member;

            const { _id: branch } = req.branch;
            const { role, userKey, password } = req.body;
            const validRoles = Object.values(USER_ROLES);

            if (!validRoles.includes(role)) {
                const error = new Error("El rol proporcionado no es valido");
                return res.status(400).json({ message: error.message });
            }

            member.role = role || member.role;
            const credentials = await Credential.findOne({ user: member.user, branch });

            credentials.userKey = userKey || credentials.userKey;
            if (password) {
                const newPasswordHash = await hashPassword(password);
                credentials.password = newPasswordHash || credentials.password;
            }
            await Promise.all([member.save(), credentials.save()]);


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
                BusinessMember.findByIdAndDelete(member._id),
                Credential.findOneAndDelete({
                    user: member.user,
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