import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { handleInputErrors } from "../utils/validator";
import { createUser, isAuthenticate, loginUser, updateUser } from "../middlewares/UserMiddlewares";


const router: Router = Router();
router.get('/me', isAuthenticate, UserController.getMe);
router.post('/create', handleInputErrors, createUser,UserController.create);
router.patch('/update', handleInputErrors, updateUser,UserController.update);
router.post('/login', handleInputErrors, loginUser, UserController.login);

export default router;