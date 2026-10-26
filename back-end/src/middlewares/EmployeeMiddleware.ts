import { Request, Response, NextFunction } from "express";
import { paginate, PaginationResult } from "../lib/pagination";
import { IBranch } from "../models/Branch";
import { BranchSession } from "../models/BranchAccess";
import { MEMBER_ROLES, IMember, BranchEmployee, Member } from "../models/Member";
import { Credential, ICredential } from "../models/Credential";
import { checkPassword, escapeRegex, hashAccessToken } from "../utils";
import { body, param, query } from "express-validator";
import { BranchSchedule } from "../models/BranchSchedule";
import { HydratedDocument, Types } from "mongoose";
import { toBranchEmployee } from "../mappers/BranchEmployee.mapper";

declare global {
    namespace Express {
        interface Request {
            myBranches: PaginationResult<IBranch>;
            myBranch: IBranch;
            employees: PaginationResult<BranchEmployee>;
            employee: BranchEmployee;
            searchEmployee: PaginationResult<BranchEmployee>;
            employeesStats: EmployeesStats;
        }
    }
}

type EmployeesStats = {
    activeEmployees: number;
    totalEmployees: number;
    totalAdministrators: number;
};

const USER_PUBLIC_FIELDS = "-password -__v -createdAt -updatedAt";

// Roles que se consideran "empleados" dentro de una sucursal.
const EMPLOYEE_ROLES = [
    MEMBER_ROLES.ADMIN,
    MEMBER_ROLES.EMPLOYEE,
    MEMBER_ROLES.MANAGER,
    MEMBER_ROLES.STAFF,
    MEMBER_ROLES.CASHIER
];

const EMPTY_STATS: EmployeesStats = {
    activeEmployees: 0,
    totalEmployees: 0,
    totalAdministrators: 0
};

/* -------------------------------------------------------------------------- */
/*                                   Reglas                                   */
/* -------------------------------------------------------------------------- */

// Validar el ID de la sucursal.
export const branchIdRules = [
    param("branchId")
        .isMongoId()
        .withMessage("El ID de la sucursal no es válido.")
];

// Validar el ID de la sucursal y la palabra clave de búsqueda.
export const employeeParamsRules = [
    ...branchIdRules,
    param("search")
        .isString()
        .withMessage("La palabra clave debe ser una cadena de texto.")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("La palabra clave es obligatoria.")
];

// Validar los filtros (opcionales) de empleados.
export const employeeParamsRulesByFilters = [
    ...branchIdRules,
    query("isActive")
        .optional()
        .isBoolean()
        .withMessage("El isActive debe ser un booleano."),
    query("role")
        .optional()
        .isIn(Object.values(MEMBER_ROLES))
        .withMessage("El rol no es valido.")
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

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

// Pagina credenciales de una sucursal y las convierte a BranchEmployee.
async function paginateBranchEmployees(
    filter: Record<string, unknown>,
    page: Request["query"]["page"]
): Promise<PaginationResult<BranchEmployee>> {
    const result = await paginate(Credential, filter, {
        page,
        sort: { updatedAt: -1 },
        select: "user role",
        populate: { path: "user", select: USER_PUBLIC_FIELDS }
    });

    const data = result.data.flatMap((credential) => {
        const user = credential.user;

        if (user === null || typeof user !== "object" || !("_id" in user)) {
            return [];
        }

        const member = (user as HydratedDocument<IMember>).toObject();
        return [toBranchEmployee(member, credential)];
    });

    return { data, pagination: result.pagination };
}

// IDs de los usuarios que pertenecen a la sucursal (opcionalmente filtrado por rol).
function getBranchUserIds(branchId: Types.ObjectId, role?: string) {
    return Credential.distinct("user", {
        branch: branchId,
        ...(role && { role })
    });
}

// Estadísticas de empleados de una sucursal.
async function getEmployeesStats(
    employeeFilter: Record<string, unknown>
): Promise<EmployeesStats> {
    const [stats] = await Credential.aggregate<EmployeesStats>([
        { $match: employeeFilter },
        {
            $group: {
                _id: "$user",
                isAdministrator: {
                    $max: { $cond: [{ $eq: ["$role", MEMBER_ROLES.ADMIN] }, 1, 0] }
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
        { $unwind: "$member" },
        {
            $group: {
                _id: null,
                totalEmployees: { $sum: 1 },
                activeEmployees: {
                    $sum: { $cond: [{ $eq: ["$member.isActive", true] }, 1, 0] }
                },
                totalAdministrators: { $sum: "$isAdministrator" }
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
    ]);

    return stats ?? EMPTY_STATS;
}

/* -------------------------------------------------------------------------- */
/*                                Middlewares                                 */
/* -------------------------------------------------------------------------- */

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

        const branches = result.data
            .map((credential) => credential.branch)
            .filter((branch): branch is IBranch => branch !== null && typeof branch === "object");

        req.myBranches = { data: branches, pagination: result.pagination };

        next();
    } catch (error) {
        next(error);
    }
}

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

        const [credential, schedules] = await Promise.all([
            Credential.findOne({ user: req.member._id, branch: branchId })
                .populate({
                    path: "branch",
                    select: "-__v -createdAt -updatedAt -business"
                })
                .select("-__v -createdAt -updatedAt -business -id"),
            BranchSchedule.findOne({ branch: branchId })
                .select("-__v -createdAt -updatedAt -branch")
                .lean()
        ]);

        if (!credential?.branch) {
            return res.status(403).json({ message: "No tienes acceso a esta sucursal." });
        }

        const branch = credential.branch as unknown as IBranch;

        req.myBranch = {
            ...branch.toObject(),
            schedules: schedules ?? null
        } as unknown as IBranch;

        req.credential = credential as unknown as ICredential;

        next();
    } catch (error) {
        next(error);
    }
}

// Busca un empleado por su ID dentro de la sucursal.
export const employeeExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { branchId, employeeId } = req.params;

        if (!branchId || !employeeId) {
            return res.status(400).json({ message: "Debes proporcionar un empleado válido." });
        }

        const credential = await Credential.findOne({ user: employeeId, branch: branchId })
            .populate("user", USER_PUBLIC_FIELDS);

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

        const employeeFilter = {
            branch: req.myBranch._id,
            role: { $in: EMPLOYEE_ROLES }
        };

        const [employees, stats] = await Promise.all([
            paginateBranchEmployees(employeeFilter, req.query.page),
            getEmployeesStats(employeeFilter)
        ]);

        req.employees = employees;
        req.employeesStats = stats;

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
        });

        if (!session) {
            return res.status(403).json({ message: "No tienes una sesión activa para esta sucursal." });
        }

        next();
    } catch (error) {
        next(error);
    }
}

// Buscar empleados de la sucursal por nombre, apellido, nombre completo o email.
export const getSearchEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { branchId, search } = req.params;

        if (typeof search !== "string" || !search.trim()) {
            return res.status(400).json({ message: "Debes proporcionar un texto de búsqueda." });
        }

        const searchValue = escapeRegex(search.trim());
        const exactMatch = new RegExp(`^${searchValue}$`, "i");

        // Solo se buscan miembros que pertenecen a esta sucursal.
        const branchUserIds = await getBranchUserIds(req.myBranch._id);

        const memberIds = await Member.find({
            _id: { $in: branchUserIds },
            $or: [
                { name: exactMatch },
                { last_name: exactMatch },
                { email: exactMatch },
                {
                    $expr: {
                        $regexMatch: {
                            input: { $concat: ["$name", " ", "$last_name"] },
                            regex: `^${searchValue}$`,
                            options: "i"
                        }
                    }
                }
            ]
        }).distinct("_id");

        req.searchEmployee = await paginateBranchEmployees(
            { branch: branchId, user: { $in: memberIds } },
            req.query.page
        );

        next();
    } catch (error) {
        next(error);
    }
};

// Buscar empleados de la sucursal por rol y/o estado.
export const getSearchEmployeeByFilters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { branchId } = req.params;
        const { isActive, role } = req.query;

        const filter: Record<string, unknown> = { branch: branchId };

        if (typeof role === "string" && role.trim()) {
            filter.role = role.trim();
        }

        if (isActive === "true" || isActive === "false") {
            const branchUserIds = await getBranchUserIds(
                req.myBranch._id,
                filter.role as string | undefined
            );

            const userIds = await Member.find({
                _id: { $in: branchUserIds },
                isActive: isActive === "true"
            }).distinct("_id");

            filter.user = { $in: userIds };
        }

        req.searchEmployee = await paginateBranchEmployees(filter, req.query.page);

        next();
    } catch (error) {
        next(error);
    }
};