import { Router } from "express";
import { BusinessMemberController } from "../controllers/BusinessMemberController";
import { isAuthenticate } from "../middlewares/UserMiddlewares";
import { hasRole, parseImage } from "../middlewares/GlobalMiddleware";
import { handleInputErrors } from "../utils/validator";
import { addMemberToBusinessRules, registerMemberRules, searchMember, updateMemberCredentialsRules, updateMemberRules } from "../middlewares/BusinessMemberMiddleware";
import { existBranch, existMemberInToBranch } from "../middlewares/BranchMiddeware";
import { existBusiness } from "../middlewares/BusinessMiddleware";
import { MEMBER_ROLES } from "../models/Member";
import { existMember, existMembers, isFoundMemberInBusiness } from "../middlewares/MemberMiddleware";
import { MemberController } from "../controllers/MemberController";

const router: Router = Router();
router.use(isAuthenticate, hasRole(MEMBER_ROLES.OWNER, MEMBER_ROLES.ADMIN));
router.get('/:businessId/members', existBusiness, existMembers, handleInputErrors, BusinessMemberController.members); // Check
router.get('/:businessId/:memberId/member', existBusiness, existMember, handleInputErrors, BusinessMemberController.member); // Check
router.post('/:businessId/:branchId/:memberId/add/member', existBusiness, existBranch, existMember, addMemberToBusinessRules, handleInputErrors, BusinessMemberController.add); // Check
router.patch('/:businessId/:branchId/:memberId/update/member', existBusiness, existBranch, existMember, existMemberInToBranch, updateMemberCredentialsRules, handleInputErrors, BusinessMemberController.updateMemberCredentials); // Check
router.delete('/:businessId/:branchId/:memberId/delete/member', existBusiness, existBranch, existMember, existMemberInToBranch, handleInputErrors, BusinessMemberController.deleteMember); // Check
router.get('/:businessId/:email/search-member', existBusiness, isFoundMemberInBusiness, searchMember,handleInputErrors, MemberController.search);

// MemberController with Routes
router.post('/:businessId/register/member', existBusiness, registerMemberRules, handleInputErrors, MemberController.create);
router.patch('/:businessId/update/:memberId', existBusiness, existMember,  updateMemberRules, handleInputErrors, MemberController.update);
router.delete('/:businessId/delete/:memberId', existBusiness,existMember, handleInputErrors, MemberController.delete);
router.put('/:businessId/upload/image-profile/:memberId', existMember, parseImage, handleInputErrors, MemberController.uploadImage);
export default router;