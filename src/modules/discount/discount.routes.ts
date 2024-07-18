import { Router } from "express";
import { validateRequest } from "../../middlewares";
import { discountController } from "./discount.controller";
import { discountValidation } from "./discount.validation";
const router: Router = Router();

router
  .route("/")
  .get(discountController.getAll)
  .post(validateRequest(discountValidation.create), discountController.create);

router
  .route("/:code")
  .post(
    validateRequest(discountValidation.applyDiscountByCode),
    discountController.applyDiscountByCode,
  );

export default router;
