import { Router } from "express";
import validateRequest from "./../../middlewares/validateRequest";
import { productController } from "./product.controller";
import { productValidationSchema } from "./product.validation";
const router: Router = Router();

router
  .route("/")
  .get(productController.getAll)
  .post(
    validateRequest(productValidationSchema.create),
    productController.create,
  );

router.route("/:id").get(productController.getSingle);

export default router;
