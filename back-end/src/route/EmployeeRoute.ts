import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { isAuthenticate } from "../middlewares/UserMiddlewares";
import { accessToBranch, getMyBranches, getMyEmployees, isValidCredentials } from "../middlewares/EmployeeMiddleware";
import { handleInputErrors } from "../utils/validator";

const router: Router = Router();
router.use(isAuthenticate);
router.get('/branches', getMyBranches, handleInputErrors, EmployeeController.getMyBranches);
router.get('/branch/:branchId', isValidCredentials, accessToBranch, handleInputErrors, EmployeeController.getBranchById);
router.get('/branch/:branchId/employees', accessToBranch, getMyEmployees, handleInputErrors, EmployeeController.getEmployees);
router.get('/categories', EmployeeController.getCategories);

export default router;