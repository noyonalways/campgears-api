import httpStatus from "http-status";
import { catchAsync, sendResponse } from "../../utils";
import { IReview } from "./review.interface";
import { reviewService } from "./review.service";

// create (user)
const create = catchAsync(async (req, res) => {
  const review = await reviewService.create(req.params.productId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: review,
  });
});

// get all reviews by product Id (user)
const getReviewsByProductId = catchAsync(async (req, res) => {
  const reviews: IReview[] = await reviewService.getReviewsByProductId(
    req.params.productId,
    req.query,
  );

  if (reviews.length <= 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data found",
      data: reviews,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews fetched successfully",
    data: reviews,
  });
});

// get all (admin)
const getAll = catchAsync(async (req, res) => {
  const reviews: IReview[] = await reviewService.getAll(req.query);

  if (reviews.length <= 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data found",
      data: reviews,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews fetched successfully",
    data: reviews,
  });
});

export const reviewController = {
  create,
  getAll,
  getReviewsByProductId,
};
