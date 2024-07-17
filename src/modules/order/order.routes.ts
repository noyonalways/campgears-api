import { Router } from "express";
import { validateRequest } from "../../middlewares";
import { orderController } from "./order.controller";
import { orderValidationSchema } from "./order.validation";
const router: Router = Router();

router
  .route("/")
  .post(validateRequest(orderValidationSchema.create), orderController.create);

export default router;
