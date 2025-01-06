import { Router } from "express";
import { auth, validateRequest } from "../../middlewares";
import { USER_ROLES } from "../user/user.constant";
import { categoryController } from "./category.controller";
import { categoryValidation } from "./category.validation";

const router: Router = Router();

router
  .route("/")
  .get(categoryController.getAll)
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(categoryValidation.create),
    categoryController.create,
  );

export default router;
