import { Router } from "express";
import { BranchController } from "../controllers/BranchController";
import { isAuthenticate } from "../middlewares/UserMiddlewares";
import { handleInputErrors } from "../utils/validator";
import { hasRole } from "../middlewares/GlobalMiddleware";
import { USER_ROLES } from "../models/user";
import { existBusiness } from "../middlewares/BusinessMiddleware";
import { createBranchRules, existBranch, existBranches, updateBranch } from "../middlewares/BranchMiddeware";

const router: Router = Router();
router.use(isAuthenticate, hasRole(USER_ROLES.OWNER));
router.get('/:businessId/branches', existBusiness, existBranches, handleInputErrors, BranchController.getBranches);
router.get('/:businessId/:branchId', existBusiness, existBranch, handleInputErrors, BranchController.getBranchById);
router.post('/:businessId/add', existBusiness,createBranchRules, handleInputErrors, BranchController.create);
router.patch('/:businessId/:branchId/update', existBusiness, existBranch, updateBranch, handleInputErrors, BranchController.update);
router.delete('/:businessId/:branchId/delete', existBusiness, existBranch, handleInputErrors, BranchController.delete);
export default router;