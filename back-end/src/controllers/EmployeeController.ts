
import { Request, Response } from "express";
import { Category } from "../models/Category";
import { BranchSession } from "../models/BranchAccess";
import { hashAccessToken } from "../utils";
import { Member } from "../models/Member";

export class EmployeeController {
    static async getMyBranches(req: Request, res: Response) {
        try {
            return res.status(200).json(req.myBranches);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // POST: Create access to branch by ID and userKey
    static async accessBranch(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            const branchId = req.params.branchId;

            if (!token || req.auth.type !== "employee" || !req.member?._id) {
                return res.status(403).json({ message: "No se pudo autorizar el acceso a la sucursal." });
            }

            const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);

            await BranchSession.findOneAndUpdate(
                {
                    member: req.member._id,

                },
                {
                    $set: {
                        branch: branchId,
                        tokenHash: hashAccessToken(token),
                        expiresAt
                    }
                },
                { upsert: true, new: true, runValidators: true }
            );

            return res.status(200).json({ message: "Acceso a la sucursal autorizado.", expiresAt });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // GET: Return the branch with the access token
    static async getBranchById(req: Request, res: Response) {
        try {
            return res.status(200).json(req.myBranch);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async getEmployees(req: Request, res: Response) {
        try {
            return res.status(200).json({ ...req.employees, stats: req.employeesStats });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getCategories(req: Request, res: Response) {
        try {
            const categories = await Category.find({ isActive: true }).select("-__v -parent -createdAt -updatedAt");
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getEmployee(req: Request, res: Response) {
        try {
            return res.status(200).json(req.searchEmployee);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async getEmployeesByFilters(req: Request, res: Response) {
        try {
            return res.status(200).json(req.searchEmployee);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async employeeActive(req: Request, res: Response) {
        const { _id } = req.employee;
        try {
            const { isActive } = req.body;
            console.log(isActive);
            const employee = await Member.findOne({ _id });

            if (!employee) {
                const error = new Error("Empleado no encontrado.");
                return res.status(404).json({ message: error.message });
            }
            employee.isActive = isActive;
            await employee.save();
            return res.status(200).json({ message: "Empleado actualizado correctamente." });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
