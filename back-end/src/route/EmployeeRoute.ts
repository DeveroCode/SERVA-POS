import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { isAuthenticate, userExist } from "../middlewares/UserMiddlewares";
import { employeeExist, getMyBranch, getMyBranches, getMyEmployees, isValidCredentials } from "../middlewares/EmployeeMiddleware";
import { handleInputErrors } from "../utils/validator";

const router: Router = Router();
router.use(isAuthenticate);
router.get('/branches', getMyBranches, handleInputErrors, EmployeeController.getMyBranches);
router.get('/branch/:branchId', isValidCredentials, getMyBranch, handleInputErrors, EmployeeController.getBranchById);
router.get('/branch/:branchId/employees', getMyBranch, getMyEmployees, handleInputErrors, EmployeeController.getEmployees);

export default router;