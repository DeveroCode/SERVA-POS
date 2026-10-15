
import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { isAuthenticate } from "../middlewares/UserMiddlewares";
import {
    accessToBranch,
    branchAccessRules,
    branchIdRules,
    employeeExist,
    employeeParamsRules,
    getEmployeeFromBranch,
    getMyBranches,
    getMyEmployees,
    isBranchSessionValid,
    isValidCredentials,
    setIsActiveRules
} from "../middlewares/EmployeeMiddleware";
import { handleInputErrors } from "../utils/validator";
import { hasRole } from "../middlewares/GlobalMiddleware";
import { MEMBER_ROLES } from "../models/Member";
import { BranchController } from "../controllers/BranchController";

const router: Router = Router();

router.use(isAuthenticate);

router.get("/branches", getMyBranches, EmployeeController.getMyBranches);
router.post("/branch/:branchId/access", branchAccessRules, handleInputErrors, isValidCredentials, EmployeeController.accessBranch);
router.get("/branch/:branchId", branchIdRules, handleInputErrors, isBranchSessionValid, accessToBranch, hasRole(MEMBER_ROLES.ADMIN, MEMBER_ROLES.EMPLOYEE, MEMBER_ROLES.STAFF, MEMBER_ROLES.MANAGER), EmployeeController.getBranchById);
router.put("/branch/:branchId/setActive", setIsActiveRules, handleInputErrors, isBranchSessionValid, accessToBranch, hasRole(MEMBER_ROLES.ADMIN, MEMBER_ROLES.MANAGER), BranchController.setIsActive);
router.get("/branch/:branchId/employees", branchIdRules, handleInputErrors, isBranchSessionValid, accessToBranch, hasRole(MEMBER_ROLES.ADMIN, MEMBER_ROLES.MANAGER), getMyEmployees, EmployeeController.getEmployees);
router.get("/branch/:branchId/employees/search", employeeParamsRules, handleInputErrors, isBranchSessionValid, accessToBranch, hasRole(MEMBER_ROLES.ADMIN, MEMBER_ROLES.MANAGER), getEmployeeFromBranch, EmployeeController.getEmployee);
router.get("/categories", EmployeeController.getCategories);

export default router;
