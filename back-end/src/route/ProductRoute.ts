import { Router } from "express";
import { isAuthenticate } from "../middlewares/UserMiddlewares";
import { handleInputErrors } from "../utils/validator";
import { ProductController } from "../controllers/ProductController";
import { createProductRules, existProduct, findProducts, setDisccountRules, updateProductRules } from "../middlewares/ProductMiddleware";
import { accessToBranch } from "../middlewares/EmployeeMiddleware";
import { parseImage } from "../middlewares/GlobalMiddleware";

const router: Router = Router();

router.use(isAuthenticate);
router.get("/all", accessToBranch, findProducts, handleInputErrors, ProductController.getAll);
router.get("/one/:productId", accessToBranch, existProduct, handleInputErrors, ProductController.get);
router.post("/create", accessToBranch, createProductRules, handleInputErrors, ProductController.create);
router.put("/update/:productId", accessToBranch, existProduct, updateProductRules, handleInputErrors, ProductController.update);
router.delete("/delete/:productId", accessToBranch, existProduct, handleInputErrors, ProductController.delete);
router.put("/:productId/set/discount", accessToBranch, existProduct, setDisccountRules, handleInputErrors, ProductController.discountedProduct);
router.patch("/:productId/upload/image", accessToBranch, existProduct, parseImage, ProductController.uploadProductImage);

export default router;