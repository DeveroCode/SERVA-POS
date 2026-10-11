
import { Request, Response, NextFunction } from "express";
import { Category } from "../models/Category";
import { BranchSession } from "../models/BranchAccess";
import { hashAccessToken } from "../utils";

export class EmployeeController {
    static async getMyBranches(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(req.myBranches);
        } catch (error) {
            next(error);
        }
    }

    // POST: Create access to branch by ID and userKey
    static async accessBranch(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.match(/^Bearer\s+(\S+)$/i)?.[1];
            const branchId = req.params.branchId;

            if (!token || req.auth.type !== "employee" || !req.member?._id) {
                return res.status(403).json({ message: "No se pudo autorizar el acceso a la sucursal." });
            }

            const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);

            await BranchSession.findOneAndUpdate(
                {
                    member: req.member._id,
                    branch: branchId,
                    tokenHash: hashAccessToken(token)
                },
                { $set: { expiresAt } },
                { upsert: true, new: true, runValidators: true }
            );

            return res.status(200).json({ message: "Acceso a la sucursal autorizado.", expiresAt });
        } catch (error) {
            next(error);
        }
    }

    // GET: Return the branch with the access token
    static async getBranchById(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(req.myBranch);
        } catch (error) {
            next(error);
        }
    }

    static async getEmployees(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(req.employees);
        } catch (error) {
            next(error);
        }
    }

    static async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await Category.find({ isActive: true }).select("-__v -parent -createdAt -updatedAt");
            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    static async getEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(req.employee);
        } catch (error) {
            next(error);
        }
    }
}
