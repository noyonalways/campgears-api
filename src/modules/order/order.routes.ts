import { Router } from "express";
import { auth, validateRequest } from "../../middlewares";
import { USER_ROLES } from "../user/user.constant";
import { orderController } from "./order.controller";
import { orderValidationSchema } from "./order.validation";
const router: Router = Router();

router
  .route("/")
  .get(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), orderController.getAll)
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    validateRequest(orderValidationSchema.create),
    orderController.create,
  );

// get single order (logged in user order)
router.get(
  "/:id",
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  orderController.getSingle,
);

export default router;
