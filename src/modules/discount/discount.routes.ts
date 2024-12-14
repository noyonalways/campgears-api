import { Router } from "express";
import { validateRequest } from "../../middlewares";
import { USER_ROLES } from "../user/user.constant";
import auth from "./../../middlewares/auth";
import { discountController } from "./discount.controller";
import { discountValidation } from "./discount.validation";
const router: Router = Router();

router
  .route("/")
  .get(discountController.getAll)
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(discountValidation.create),
    discountController.create,
  );

router
  .route("/:code")
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    validateRequest(discountValidation.applyDiscountByCode),
    discountController.applyDiscountByCode,
  );

export default router;
