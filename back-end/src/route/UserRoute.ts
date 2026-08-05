import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { handleInputErrors } from "../utils/validator";
import { createUser, isAuthenticate, loginUser, updatePassword, updateUser, userExist } from "../middlewares/UserMiddlewares";
import { parseImage } from "../middlewares/GlobalMiddleware";


const router: Router = Router();
router.post('/create', handleInputErrors, createUser,UserController.create);
router.post('/login', userExist, loginUser,handleInputErrors, UserController.login);

router.use(isAuthenticate);
router.get('/me', UserController.getMe);
router.patch('/update', userExist,handleInputErrors, updateUser,UserController.update);
router.put('/update-password', userExist, handleInputErrors, updatePassword,UserController.updatePassword);
router.put('/upload/image-profile', parseImage, handleInputErrors,UserController.uploadImageProfile);
export default router;