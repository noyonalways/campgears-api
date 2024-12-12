import { Router } from "express";
import { validateRequest } from "../../middlewares";
import { authController } from "./auth.controller";
const router: Router = Router();

router.post("/register", validateRequest, authController.register);

export default router;
