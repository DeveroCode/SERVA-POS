export class EmployeeController {
    static async getMyBranches(req: any, res: any) {
        try {
            res.json(req.myBranches);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}