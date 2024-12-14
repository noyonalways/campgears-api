import { Router } from "express";
import { auth } from "../../middlewares";
import { USER_ROLES } from "../user/user.constant";
import validateRequest from "./../../middlewares/validateRequest";
import { productController } from "./product.controller";
import { productValidationSchema } from "./product.validation";
const router: Router = Router();

router
  .route("/")
  .get(productController.getAll)
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(productValidationSchema.create),
    productController.create,
  );

router
  .route("/:id")
  .get(productController.getSingle)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(productValidationSchema.update),
    productController.update,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    productController.deleteSingle,
  );

export default router;
