import { Router } from "express";
import { BusinessMemberController } from "../controllers/BusinessMemberController";
import { isAuthenticate } from "../middlewares/UserMiddlewares";
import { hasRole } from "../middlewares/GlobalMiddleware";
import { BRANCH_MEMBER_ROLE } from "../models/BusinessMember";
import { handleInputErrors } from "../utils/validator";
import { addMemberToBusinessRules, existMember, existMembers, updateMemberRules } from "../middlewares/BusinessMemberMiddleware";
import { existBranch } from "../middlewares/BranchMiddeware";
import { existBusiness } from "../middlewares/BusinessMiddleware";

const router: Router = Router();
router.use(isAuthenticate, hasRole(BRANCH_MEMBER_ROLE.ADMIN, BRANCH_MEMBER_ROLE.OWNER));
router.get('/:businessId/members', existBusiness, existMembers, handleInputErrors, BusinessMemberController.members);
router.get('/:businessId/:userId/member', existBusiness, existMember, handleInputErrors, BusinessMemberController.member);
router.post('/:businessId/:branchId/add/member', existBusiness, existBranch, addMemberToBusinessRules, handleInputErrors, BusinessMemberController.add);
router.patch('/:businessId/:branchId/:userId/update/member', existBusiness, existBranch, existMember, updateMemberRules, handleInputErrors, BusinessMemberController.updateMember);
router.delete('/:businessId/:branchId/:userId/delete/member', existBusiness, existBranch, existMember, handleInputErrors, BusinessMemberController.deleteMember);
export default router;