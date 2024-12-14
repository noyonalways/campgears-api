import { Router } from "express";
import { auth } from "../../middlewares";
import { USER_ROLES } from "./user.constant";
import { userController } from "./user.controller";

const router: Router = Router();

router
  .route("/")
  .get(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), userController.getAll);

export default router;
