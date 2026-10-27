import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { isAuthenticate } from "../middlewares/UserMiddlewares";
import {
    accessToBranch,
    branchAccessRules,
    branchIdRules,
    employeeExist,
    employeeParamsRules,
    employeeParamsRulesByFilters,
    getMyBranches,
    getMyEmployees,
    getSearchEmployee,
    getSearchEmployeeByFilters,
    isBranchSessionValid,
    isValidCredentials,
    setIsActiveRules,
    setScheduleRules
} from "../middlewares/EmployeeMiddleware";
import { handleInputErrors } from "../utils/validator";
import { hasRole } from "../middlewares/GlobalMiddleware";
import { MEMBER_ROLES } from "../models/Member";
import { BranchController } from "../controllers/BranchController";
import { getCredentialsRules, updateMemberCredentialsRules } from "../middlewares/BusinessMemberMiddleware";
import { BusinessMemberController } from "../controllers/BusinessMemberController";

const router: Router = Router();

router.use(isAuthenticate);

// Sesión de sucursal + acceso del miembro a la sucursal
const branchGuard = [isBranchSessionValid, accessToBranch];
const adminOrManager = hasRole(MEMBER_ROLES.ADMIN, MEMBER_ROLES.MANAGER);

router.get("/branches", getMyBranches, EmployeeController.getMyBranches);
router.post("/branch/:branchId/access", branchAccessRules, handleInputErrors, isValidCredentials, EmployeeController.accessBranch);
router.get(
    "/branch/:branchId",
    branchIdRules, handleInputErrors, branchGuard,
    hasRole(MEMBER_ROLES.ADMIN, MEMBER_ROLES.EMPLOYEE, MEMBER_ROLES.STAFF, MEMBER_ROLES.MANAGER),
    EmployeeController.getBranchById
);
router.put(
    "/branch/:branchId/setActive",
    setIsActiveRules, handleInputErrors, branchGuard, adminOrManager,
    BranchController.setIsActive
);
router.put(
    "/branch/:branchId/schedule/set",
    setScheduleRules, handleInputErrors, branchGuard, adminOrManager,
    BranchController.setSchedule
);

// Rutas con segmento fijo SIEMPRE antes de la ruta dinámica /:search
router.get(
    "/branch/:branchId/employees",
    branchIdRules, handleInputErrors, branchGuard, adminOrManager,
    getMyEmployees,
    EmployeeController.getEmployees
);
router.get(
    "/branch/:branchId/filters",
    employeeParamsRulesByFilters, handleInputErrors, branchGuard, adminOrManager,
    getSearchEmployeeByFilters,
    EmployeeController.getEmployeesByFilters
);
router.get(
    "/branch/:branchId/:search",
    employeeParamsRules, handleInputErrors, branchGuard, adminOrManager,
    getSearchEmployee,
    EmployeeController.getEmployee
);
router.get("/categories", EmployeeController.getCategories);
router.patch("/branch/:branchId/:employeeId/active", handleInputErrors, branchGuard, adminOrManager, employeeExist, EmployeeController.employeeActive);

// Business Member Controller
router.get(
    "/:branchId/:employeeId/get/credentials",
    getCredentialsRules, handleInputErrors, branchGuard,
    BusinessMemberController.getCredentials
);
router.patch(
    "/:branchId/:employeeId/update/credentials",
    updateMemberCredentialsRules, handleInputErrors, branchGuard, employeeExist,
    BusinessMemberController.updateMemberCredentials
);

export default router;