import { Request, Response, NextFunction } from "express";
import { IMember, Member } from "../models/Member";

declare global {
    namespace Express {
        interface Request {
            members: IMember[];
            member: IMember;
            searchMember: IMember;
        }
    }
}


export async function existMember(req: Request, res: Response, next: NextFunction) {
    try {
        const { _id: businessId } = req.business;
        const { memberId } = req.params;

        const existMemberInBusiness = await Member.findOne({
            _id: memberId,
            business: businessId
        })
            .populate({
                path: "business",
                select: "name -_id"
            })
            .select("name last_name email phone_number image isActive lastLogin");

        if (!existMemberInBusiness) {
            const error = new Error("No existe un miembro con este ID en este negocio.");
            return res.status(400).json(error.message);
        }

        req.member = existMemberInBusiness;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export async function isFoundMemberInBusiness(req: Request, res: Response, next: NextFunction) {
    try {
        const {_id: businessId} = req.business;
        const { email } = req.params;

        const existMemberInBusiness = await Member.findOne({
            email,
            business: businessId
        })
            .select("name last_name email phone_number role image");

        if (!existMemberInBusiness) {
            const error = new Error("No existe un miembro con este correo en este negocio.");
            return res.status(400).json(error.message);
        }

        req.searchMember = existMemberInBusiness;
        next();
    } catch (e) {
         return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function existMembers(req: Request, res: Response, next: NextFunction) {
    try {
        const { _id: businessId } = req.business;

        const existMembersInBusiness = await Member.find({
            business: businessId
        })
            .populate({
                path: "business",
                select: "name -_id"
            })
            .select("name last_name email phone_number image isActive lastLogin role");

        if (!existMembersInBusiness.length) {
            const error = new Error("No hay miembros en este negocio.");
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