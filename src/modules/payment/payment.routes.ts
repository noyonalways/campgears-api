import { Router } from "express";
import { paymentController } from "./payment.controller";
const router: Router = Router();

router.route("/confirmation").post(paymentController.confirmation);

export default router;
