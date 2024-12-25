import { Router } from "express";
import { auth, validateRequest } from "../../middlewares";
import { USER_ROLES } from "../user/user.constant";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
const router: Router = Router();

router.post(
  "/register",
  validateRequest(authValidation.register),
  authController.register,
);

router.post(
  "/login",
  validateRequest(authValidation.login),
  authController.login,
);

router.post(
  "/social-login",
  validateRequest(authValidation.socialLogin),
  authController.socialLogin,
);

router.get(
  "/me",
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  authController.getMe,
);

router.post(
  "/refresh-token",
  validateRequest(authValidation.refreshToken),
  authController.generateNewAccessToken,
);

router.post(
  "/change-password",
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  validateRequest(authValidation.changePassword),
  authController.changePassword,
);

router.post(
  "/forget-password",
  validateRequest(authValidation.forgetPassword),
  authController.forgetPassword,
);

router.post(
  "/reset-password",
  validateRequest(authValidation.resetPassword),
  authController.resetPassword,
);

export default router;
