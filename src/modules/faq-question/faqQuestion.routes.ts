import { Router } from "express";
import { validateRequest } from "../../middlewares";
import { faqQuestionController } from "./faqQuestion.controller";
import { faqQuestionValidation } from "./faqQuestion.validation";
const router: Router = Router();

router
  .route("/")
  .get(faqQuestionController.getAll)
  .post(
    validateRequest(faqQuestionValidation.create),
    faqQuestionController.create,
  );

export default router;
