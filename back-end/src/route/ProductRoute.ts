import { Router } from "express";
import { isAuthenticate } from "../middlewares/UserMiddlewares";
import { handleInputErrors } from "../utils/validator";
import { ProductController } from "../controllers/ProductController";
import { createProductRules, existProduct, findProducts, setDiscountRules, updateProductRules } from "../middlewares/ProductMiddleware";
import { accessToBranch } from "../middlewares/EmployeeMiddleware";
import { hasRole, parseImage } from "../middlewares/GlobalMiddleware";
import { MEMBER_ROLES } from "../models/Member";

const router: Router = Router();

router.use(isAuthenticate);

router.get("/:branchId/all", accessToBranch, findProducts, handleInputErrors, ProductController.getAll);
router.get("/:branchId/one/:productId", accessToBranch, existProduct, handleInputErrors, ProductController.get);
router.post("/:branchId/create", hasRole(MEMBER_ROLES.ADMIN), accessToBranch, createProductRules, handleInputErrors, ProductController.create);
router.put("/:branchId/update/:productId", hasRole(MEMBER_ROLES.ADMIN), accessToBranch, existProduct, updateProductRules, handleInputErrors, ProductController.update);
router.delete("/:branchId/delete/:productId", hasRole(MEMBER_ROLES.ADMIN), accessToBranch, existProduct, handleInputErrors, ProductController.delete);
router.put("/:branchId/:productId/set/discount", hasRole(MEMBER_ROLES.ADMIN), accessToBranch, existProduct, setDiscountRules, handleInputErrors, ProductController.discountedProduct);
router.patch("/:branchId/:productId/upload/image", hasRole(MEMBER_ROLES.ADMIN), accessToBranch, existProduct, parseImage, ProductController.uploadProductImage);

export default router;