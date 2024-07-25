import { Router } from "express";
import { validateRequest } from "../../middlewares";
import { reviewController } from "./review.controller";
import { reviewValidationSchema } from "./review.validation";
const router: Router = Router();

router.route("/reviews").get(reviewController.getAll);

router
  .route("/:productId/reviews")
  .get(reviewController.getReviewsByProductId)
  .post(
    validateRequest(reviewValidationSchema.create),
    reviewController.create,
  );

export default router;
