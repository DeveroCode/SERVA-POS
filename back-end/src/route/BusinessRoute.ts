import { Router } from "express";
import { BusinessController } from "../controllers/BusinessController";
import { isAuthenticate } from "../middlewares/UserMiddlewares";
import { hasRole, parseImage } from "../middlewares/GlobalMiddleware";
import { USER_ROLES } from "../models/user";
import { createBusinessRules, existBusiness, existBusinesses, registerUserRules, updateBusiness } from "../middlewares/BusinessMiddleware";
import { handleInputErrors } from "../utils/validator";

const router: Router = Router();
router.use(isAuthenticate, hasRole(USER_ROLES.OWNER));
router.get('/my-business', existBusinesses, handleInputErrors, BusinessController.getBusiness);
router.get('/:businessId', existBusiness, handleInputErrors, BusinessController.getBusinessById);
router.post('/create', createBusinessRules, handleInputErrors, BusinessController.createBusiness);
router.post('/register-user', registerUserRules, handleInputErrors, BusinessController.registerUser);
router.put('/update/:businessId', existBusiness, updateBusiness, handleInputErrors, BusinessController.updateBusiness);
router.patch('/update/:businessId/logo', existBusiness, parseImage, handleInputErrors, BusinessController.uploadLogo);
router.patch('/update/:businessId/cover', existBusiness, parseImage, handleInputErrors, BusinessController.uploadCover);
router.delete('/delete/:businessId', existBusiness, handleInputErrors, BusinessController.deleteBusiness);
export default router;