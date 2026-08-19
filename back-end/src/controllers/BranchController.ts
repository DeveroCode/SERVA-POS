import { Request, Response } from "express"
import { Branch } from "../models/Branch"

const MAX_BRANCHES = 3;
export class BranchController {
    static getBranches = async (req: Request, res: Response) => {
        try {
            return res.status(200).json(req.branches);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    static getBranchById = async (req: Request, res: Response) => {
        try {
            return res.status(200).json(req.branch);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    static create = async (req: Request, res: Response) => {
        const { _id: businessId } = req.business;
        const { name, slug, description, email, phone, address } = req.body;

        try {
            const branchCount = await Branch.countDocuments({
                business: businessId,
            });

            if (branchCount >= MAX_BRANCHES) {
                const error = new Error(`No puedes crear mas de ${MAX_BRANCHES} sucursales.`);
                return res.status(400).json({ message: error.message });
            }

            const existBranch = await Branch.findOne({
                name,
                business: businessId,
            });

            if (existBranch) {
                const error = new Error('Ya existe una sucursal con ese nombre.');
                return res.status(400).json({ message: error.message });
            }

            const branch = new Branch({
                name,
                slug,
                description,
                email,
                phone,
                address,
                business: businessId,
            });

            await branch.save();

            return res.status(201).json({
                message: 'Sucursal creada correctamente',
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    };
    static update = async (req: Request, res: Response) => {
        const branch = req.branch;
        const { name, slug, description, email, phone, address } = req.body;
        try {
            branch.name = name || branch.name;
            branch.slug = slug || branch.slug;
            branch.description = description || branch.description;
            branch.email = email || branch.email;
            branch.phone = phone || branch.phone;
            branch.address = address || branch.address;
            await branch.save();
            return res.status(200).json({
                message: 'Sucursal actualizada correctamente',
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    }
    static delete = async (req: Request, res: Response) => {
        const branch = req.branch;
        try {
            await branch.deleteOne();
            return res.status(200).json({
                message: 'Sucursal eliminada correctamente',
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    }
}