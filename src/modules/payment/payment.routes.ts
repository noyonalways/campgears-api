import { Router } from "express";
import { paymentController } from "./payment.controller";
const router: Router = Router();

router.route("/confirmation").post(paymentController.confirmation);
router.route("/delete").delete(paymentController.deleteCancelPaymentOrder);

export default router;
