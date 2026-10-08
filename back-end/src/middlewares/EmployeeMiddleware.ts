import { Request, Response, NextFunction } from "express";
import { paginate, PaginationResult } from "../lib/pagination";
import { IBranch } from "../models/Branch";
import { MEMBER_ROLES, IMember } from "../models/Member";
import { Credential } from "../models/Credential";
import { checkPassword, hashPassword } from "../utils";
import { check } from "express-validator";
import { log } from "console";

declare global {
    namespace Express {
        interface Request {
            myBranches: PaginationResult<IBranch>;
            myBranch: IBranch;
            employees: PaginationResult<IMember>;
        }
    }
}

export async function getMyBranches(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.member?._id;

        const result = await paginate(
            Credential,
            {
                user: userId,
            },
            {
                page: req.query.page,
                sort: {
                    updatedAt: -1,
                },
                select: "branch",
                populate: {
                    path: "branch",
                    select: "-__v -createdAt -updatedAt -business",
                },
            }
        );

        if (!result.data.length) {
            const error = new Error("No tienes sucursales asignadas como administrador.");
            return res.status(404).json({
                message: error.message,
            });
        }

        const branches: IBranch[] = result.data
            .map((credential) => credential.branch)
            .filter(
                (branch): branch is IBranch =>
                    branch !== null &&
                    typeof branch === "object"
            );

        req.myBranches = {
            data: branches,
            pagination: result.pagination,
        };

        next();

    } catch (error) {
        next(error);
    }
}
// Valida si pertenece la branch a cierto user
export async function accessToBranch(req: Request, res: Response, next: NextFunction) {
    try {
        const { _id } = req.member as IMember;
        const { branchId } = req.params;

        const branch = await Credential.findOne({ user: _id, branch: branchId })
            .populate("branch", "-__v -createdAt -updatedAt -business")
            .select("-__v -createdAt -updatedAt -business")
            .lean();

        if (!branch) {
            const error = new Error("No tienes acceso a esta sucursal.");
            return res.status(404).json({ message: error.message });
        }

        req.myBranch = branch.branch as IBranch;
        next();
    } catch (error) {
        next(error);
    }
}

export const employeeExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userKey } = req.body;

        const credential = await Credential.findOne({ userKey }).populate("user", "-password -__v -createdAt -updatedAt");

        if (!credential) {
            const error = new Error("No existe un usuario con este userKey, por favor verifica tu userKey.");
            return res.status(404).json({ message: error.message });
        }

        if (!credential.user) {
            const error = new Error("No se encontró un usuario asociado a este userKey.");
            return res.status(404).json({ message: error.message });
        }

        req.credential = credential;
        req.member = credential.user as IMember;

        next();
    } catch (error) {
        next(error);
    }
}

export const getMyEmployees = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Matches the branch and differente from the athenticated user; furthermore, the authenticated user is'nt counted
    const branchId = req.myBranch._id as IBranch["_id"];

    const result = await paginate(
        Credential,
        {
            branch: branchId,
            user: {
                $ne: req.member._id
            },
            role: {
                $in: [
                    MEMBER_ROLES.ADMIN,
                    MEMBER_ROLES.EMPLOYEE,
                    MEMBER_ROLES.MANAGER,
                    MEMBER_ROLES.STAFF
                ]
            }
        },
        {
            page: req.query.page,
            sort: {
                updatedAt: -1,
            },
            select: "user",
            populate: {
                path: "user",
                select: "-password -__v -createdAt -updatedAt",
            },
        }
    );

    const employees: IMember[] = result.data
        .map((credential) => credential.user)
        .filter(
            (user): user is IMember =>
                user !== null &&
                typeof user === "object"
        );

    req.employees = {
        data: employees,
        pagination: result.pagination,
    };

    next();
}

export async function isValidCredentials(req: Request, res: Response, next: NextFunction) {
    try {
        const { userKey, password } = req.body;
        const findCredentials = await Credential.findOne({ userKey })
            .populate("user", "-password -__v -createdAt -updatedAt")
            .select("-__v -createdAt -updatedAt -business")
            .lean();
        const matchedPassword = await checkPassword(password, findCredentials.password);

        if (!matchedPassword) {
            const error = new Error("Credenciales inválidas, por favor verifica tu usuario y contraseña o contacta con el administrador.");
            return res.status(400).json({ message: error.message });
        }

        req.member = findCredentials.user as IMember;
        next();
    } catch (error) {
        next(error);
    }
}