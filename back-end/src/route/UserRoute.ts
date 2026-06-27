import { Router } from "express";
import { UserController } from "../controllers/UserController";


const router: Router = Router();
router.post('/create', UserController.create);

export default router;