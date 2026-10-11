
import { Request, Response, NextFunction } from "express";
import { paginate, PaginationResult } from "../lib/pagination";
import { IBranch } from "../models/Branch";
import { BranchSession } from "../models/BranchAccess";
import { MEMBER_ROLES, IMember } from "../models/Member";
import { Credential } from "../models/Credential";
import { checkPassword, hashAccessToken } from "../utils";
import { body, param, query } from "express-validator";

declare global {
    namespace Express {
        interface Request {
            myBranches: PaginationResult<IBranch>;
            myBranch: IBranch;
            employees: PaginationResult<IMember>;
            employee: IMember;
        }
    }
}

// Obtener las sucursales asignadas al miembro autenticado.
export async function getMyBranches(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.member?._id;

        if (!userId) {
            return res.status(401).json({ message: "No se encontró el miembro autenticado." });
        }

        const result = await paginate(
            Credential,
            { user: userId },
            {
                page: req.query.page,
                sort: { updatedAt: -1 },
                select: "branch",
                populate: {
                    path: "branch",
                    select: "-__v -createdAt -updatedAt -business"
                }
            }
        );

        if (!result.data.length) {
            return res.status(404).json({ message: "No tienes sucursales asignadas." });
        }

        const branches: IBranch[] = result.data
            .map((credential) => credential.branch)
            .filter((branch): branch is IBranch => branch !== null && typeof branch === "object");

        req.myBranches = {
            data: branches,
            pagination: result.pagination
        };

        next();
    } catch (error) {
        next(error);
    }
}

// Validar el ID de la sucursal.
export const branchIdRules = [
    param("branchId")
        .isMongoId()
        .withMessage("El ID de la sucursal no es válido.")
];

// Validar los IDs de la sucursal y del empleado.
export const employeeParamsRules = [
    ...branchIdRules,
    query("userKey")
        .isString()
        .withMessage("El userKey debe ser una cadena de texto.")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("El userKey es obligatorio.")
];

// Validaciones para POST /branch/:branchId/access.
export const branchAccessRules = [
    ...branchIdRules,
    body("userKey")
        .isString()
        .withMessage("El userKey debe ser una cadena de texto.")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("El userKey es obligatorio."),
    body("password")
        .isString()
        .withMessage("La contraseña debe ser una cadena de texto.")
        .bail()
        .notEmpty()
        .withMessage("La contraseña es obligatoria.")
];

// Comprueba que el miembro tenga acceso a la sucursal.
export async function accessToBranch(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.auth.type !== "employee" || !req.member?._id) {
            return res.status(403).json({ message: "No tienes acceso a esta sucursal." });
        }

        const { branchId } = req.params;

        if (!branchId) {
            return res.status(400).json({ message: "El ID de la sucursal es obligatorio." });
        }

        const credential = await Credential.findOne({ user: req.member._id, branch: branchId })
            .populate("branch", "-__v -createdAt -updatedAt -business")
            .select("-__v -createdAt -updatedAt -business")
            .lean();

        if (!credential?.branch) {
            return res.status(403).json({ message: "No tienes acceso a esta sucursal." });
        }

        req.myBranch = credential.branch as unknown as IBranch;

        next();
    } catch (error) {
        next(error);
    }
}

// Busca un empleado por userKey para los flujos que lo necesitan.
export const employeeExist = async (req: Request, res: Response, next: NextFunction) => {
   try {
        const userKey = req.query.userKey;
        const branchId = req.myBranch?._id;

        if (!branchId || typeof userKey !== "string" || !userKey.trim()) {
            return res.status(400).json({ message: "Debes proporcionar un userKey válido." });
        }

        const credential = await Credential.findOne({ userKey: userKey.trim(), branch: branchId })
            .populate("user", "-password -__v -createdAt -updatedAt");

        if (!credential?.user) {
            return res.status(404).json({ message: "No se encontró el empleado en esta sucursal." });
        }

        req.credential = credential;
        req.employee = credential.user as unknown as IMember;

        next();
    } catch (error) {
        next(error);
    }
};

// Obtener empleados pertenecientes a la sucursal autorizada.
export const getMyEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.myBranch?._id || !req.member?._id) {
            return res.status(403).json({ message: "No se pudo determinar la sucursal autorizada." });
        }

        const branchId = req.myBranch._id;

        const result = await paginate(
            Credential,
            {
                branch: branchId,
                user: { $ne: req.member._id },
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
                sort: { updatedAt: -1 },
                select: "user",
                populate: {
                    path: "user",
                    select: "-password -__v -createdAt -updatedAt"
                }
            }
        );

        const employees: IMember[] = result.data
            .map((credential) => credential.user)
            .filter((user): user is IMember => user !== null && typeof user === "object");

        req.employees = {
            data: employees,
            pagination: result.pagination
        };

        next();
    } catch (error) {
        next(error);
    }
};

// Validar las credenciales al entrar a una sucursal.
export async function isValidCredentials(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.auth.type !== "employee" || !req.member?._id) {
            return res.status(403).json({ message: "Esta operación requiere una sesión de empleado." });
        }

        const { userKey, password } = req.body;
        const { branchId } = req.params;

        const credential = await Credential.findOne({ userKey, branch: branchId }).select("+password");

        if (!credential) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }

        const belongsToAuthenticatedMember = String(credential.user) === String(req.member._id);
        const matchedPassword = await checkPassword(password, credential.password);

        if (!belongsToAuthenticatedMember || !matchedPassword) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }

        req.credential = credential;

        next();
    } catch (error) {
        next(error);
    }
}

// Verifica que exista una autorización vigente para este miembro, sucursal y JWT principal.
export async function isBranchSessionValid(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.auth.type !== "employee" || !req.member?._id) {
            return res.status(403).json({ message: "Esta operación requiere una sesión de empleado." });
        }

        const token = req.headers.authorization?.match(/^Bearer\s+(\S+)$/i)?.[1];
        const { branchId } = req.params;

        if (!token || !branchId) {
            return res.status(403).json({ message: "Debes autorizar el acceso a esta sucursal." });
        }

        const session = await BranchSession.findOne({
            member: req.member._id,
            branch: branchId,
            tokenHash: hashAccessToken(token),
            expiresAt: { $gt: new Date() }
        }).lean();

        if (!session) {
            return res.status(403).json({ message: "No tienes una sesión activa para esta sucursal." });
        }

        next();
    } catch (error) {
        next(error);
    }
}

// Obtener un empleado específico que pertenezca a la sucursal autorizada.
export const getEmployeeFromBranch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { employeeId } = req.params;
        const branchId = req.myBranch?._id;

        if (!branchId) {
            return res.status(403).json({ message: "No se pudo determinar la sucursal autorizada." });
        }

        const credential = await Credential.findOne({ user: employeeId, branch: branchId })
            .populate("user", "-password -__v -createdAt -updatedAt");

        if (!credential?.user) {
            return res.status(404).json({ message: "No se encontró el empleado en esta sucursal." });
        }

        req.employee = credential.user as unknown as IMember;

        next();
    } catch (error) {
        next(error);
    }
};
