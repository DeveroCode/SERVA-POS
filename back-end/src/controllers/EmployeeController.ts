import { Request, Response } from 'express';
import { Branch } from '../models/Branch';

export class EmployeeController {
    static async getMyBranches(req: Request, res: Response) {
        try {
            res.json(req.myBranches);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getBranchById(req: Request, res: Response) {
        try {
            res.json(req.myBranch);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getEmployees(req: Request, res: Response) {
        try {
            res.json(req.employees);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}