import { Request, Response, NextFunction } from "express";
import { paginate, PaginationResult } from "../lib/pagination";
import { IBranch } from "../models/Branch";
import { BranchSession } from "../models/BranchAccess";
import { MEMBER_ROLES, IMember, BranchEmployee } from "../models/Member";
import { Credential, ICredential } from "../models/Credential";
import { checkPassword, hashAccessToken } from "../utils";
import { body, param, query } from "express-validator";
import { BranchSchedule } from "../models/BranchSchedule";
import { HydratedDocument } from "mongoose";

declare global {
    namespace Express {
        interface Request {
            myBranches: PaginationResult<IBranch>;
            myBranch: IBranch;
            employees: PaginationResult<BranchEmployee>;
            employee: BranchEmployee;
            employeesStats: {
                activeEmployees: number;
                totalEmployees: number;
                totalAdministrators: number;
            }
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

//set active
export const setIsActiveRules = [
    ...branchIdRules,
    body("isActive")
        .isBoolean()
        .withMessage("El isActive debe ser un booleano.")
];

export const setScheduleRules = [
    ...branchIdRules,
    body("schedule")
        .isArray()
        .withMessage("El schedule debe ser un arreglo.")
        .bail(),
    body("schedule.*.day")
        .isString()
        .withMessage("El día debe ser una cadena de texto."),
    body("schedule.*.isOpen")
        .isBoolean()
        .withMessage("El isOpen debe ser un booleano.")
        .bail(),
    body("schedule.*.openTime")
        .isString()
        .withMessage("La hora de apertura debe ser una cadena de texto.")
        .bail(),
    body("schedule.*.closeTime")
        .isString()
        .withMessage("El horario de cierre debe ser una cadena de texto.")
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

        const credential = await Credential.findOne({
            user: req.member._id,
            branch: branchId
        })
            .populate({
                path: "branch",
                select: "-__v -createdAt -updatedAt -business"
            })
            .select("-__v -createdAt -updatedAt -business -id");

        if (!credential?.branch) {
            return res.status(403).json({ message: "No tienes acceso a esta sucursal." });
        }

        const branch = credential.branch as unknown as IBranch;

        const schedules = await BranchSchedule.findOne({
            branch: branch._id
        })
            .select("-__v -createdAt -updatedAt -branch")
            .lean();

        req.myBranch = {
            ...branch.toObject(),
            schedules: schedules ?? null
        } as unknown as IBranch;

        req.credential = credential as unknown as ICredential
        next();
    } catch (error) {
        next(error);
    }
}


// Busca un empleado por userKey para los flujos que lo necesitan.
export const employeeExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {branchId, employeeId} = req.params;

        if (!branchId || !employeeId) {
            return res.status(400).json({ message: "Debes proporcionar un userKey válido." });
        }

        const credential = await Credential.findOne({ user: employeeId, branch: branchId })
            .populate("user", "-password -__v -createdAt -updatedAt");

        if (!credential?.user) {
            return res.status(404).json({ message: "No se encontró el empleado en esta sucursal." });
        }

        req.credential = credential;
        req.employee = credential.user as unknown as BranchEmployee;

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

        const employeeFilter = {
            branch: branchId,
            role: {
                $in: [
                    MEMBER_ROLES.ADMIN,
                    MEMBER_ROLES.EMPLOYEE,
                    MEMBER_ROLES.MANAGER,
                    MEMBER_ROLES.STAFF
                ]
            }
        };

        const [result, statsResult] = await Promise.all([
            paginate(
                Credential,
                employeeFilter,
                {
                    page: req.query.page,
                    sort: { updatedAt: -1 },
                    select: "user role",
                    populate: {
                        path: "user",
                        select: "-password -__v -createdAt -updatedAt"
                    }
                }
            ),
            Credential.aggregate([
                { $match: employeeFilter },
                {
                    $group: {
                        _id: "$user",
                        isAdministrator: {
                            $max: {
                                $cond: [
                                    { $eq: ["$role", MEMBER_ROLES.ADMIN] },
                                    1,
                                    0
                                ]
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "members",
                        localField: "_id",
                        foreignField: "_id",
                        as: "member"
                    }
                },
                {
                    $unwind: "$member"
                },
                {
                    $group: {
                        _id: null,
                        totalEmployees: { $sum: 1 },
                        activeEmployees: {
                            $sum: {
                                $cond: [
                                    { $eq: ["$member.isActive", true] },
                                    1,
                                    0
                                ]
                            }
                        },
                        totalAdministrators: {
                            $sum: "$isAdministrator"
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        activeEmployees: 1,
                        totalEmployees: 1,
                        totalAdministrators: 1
                    }
                }
            ])
        ]);

        const employees: BranchEmployee[] = result.data
            .filter((credential) => {
                const user = credential.user;

                return user !== null
                    && typeof user === "object"
                    && "_id" in user;
            })
            .map((credential) => {
                const user = credential.user as HydratedDocument<IMember>;
                const member = user.toObject();

                return {
                    _id: member._id.toString(),
                    name: member.name,
                    last_name: member.last_name,
                    email: member.email,
                    phone_number: member.phone_number,
                    image: member.image,
                    isActive: member.isActive,
                    lastLogin: member.lastLogin,
                    role: credential.role
                };
            });

        req.employees = {
            data: employees,
            pagination: result.pagination
        };

        req.employeesStats = statsResult[0] ?? {
            activeEmployees: 0,
            totalEmployees: 0,
            totalAdministrators: 0
        };

        next();
    } catch (error) {
        next(error);
    }
};

// export const getMyEmployees = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         if (!req.myBranch?._id || !req.member?._id) {
//             return res.status(403).json({ message: "No se pudo determinar la sucursal autorizada." });
//         }

//         const branchId = req.myBranch._id;

//         const employeeFilter = {
//             branch: branchId,
//             role: {
//                 $in: [
//                     MEMBER_ROLES.ADMIN,
//                     MEMBER_ROLES.EMPLOYEE,
//                     MEMBER_ROLES.MANAGER,
//                     MEMBER_ROLES.STAFF
//                 ]
//             }
//         };

//         const [result, statsResult] = await Promise.all([
//             paginate(
//                 Credential,
//                 employeeFilter,
//                 {
//                     page: req.query.page,
//                     sort: { updatedAt: -1 },
//                     select: "user",
//                     populate: {
//                         path: "user",
//                         select: "-password -__v -createdAt -updatedAt"
//                     }
//                 }
//             ),
//             Credential.aggregate([
//                 { $match: employeeFilter },
//                 {
//                     $group: {
//                         _id: "$user",
//                         isAdministrator: {
//                             $max: {
//                                 $cond: [
//                                     { $eq: ["$role", MEMBER_ROLES.ADMIN] },
//                                     1,
//                                     0
//                                 ]
//                             }
//                         }
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: "members",
//                         localField: "_id",
//                         foreignField: "_id",
//                         as: "member"
//                     }
//                 },
//                 {
//                     $unwind: "$member"
//                 },
//                 {
//                     $group: {
//                         _id: null,
//                         totalEmployees: { $sum: 1 },
//                         activeEmployees: {
//                             $sum: {
//                                 $cond: [
//                                     { $eq: ["$member.isActive", true] },
//                                     1,
//                                     0
//                                 ]
//                             }
//                         },
//                         totalAdministrators: {
//                             $sum: "$isAdministrator"
//                         }
//                     }
//                 },
//                 {
//                     $project: {
//                         _id: 0,
//                         activeEmployees: 1,
//                         totalEmployees: 1,
//                         totalAdministrators: 1
//                     }
//                 }
//             ])
//         ]);

//         const employees: IMember[] = result.data
//             .map((credential) => credential.user)
//             .filter((user): user is IMember => user !== null && typeof user === "object");

//         req.employees = {
//             data: employees,
//             pagination: result.pagination
//         };

//         req.employeesStats = statsResult[0] ?? {
//             activeEmployees: 0,
//             totalEmployees: 0,
//             totalAdministrators: 0
//         };

//         console.log(req.employeesStats);
//         next();
//     } catch (error) {
//         next(error);
//     }
// };
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
        });

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

        req.employee = credential.user as unknown as BranchEmployee;

        next();
    } catch (error) {
        next(error);
    }
};
