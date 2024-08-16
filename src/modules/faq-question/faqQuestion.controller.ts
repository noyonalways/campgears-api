import httpStatus from "http-status";
import { catchAsync, sendResponse } from "../../utils";
import { faqQuestionService } from "./faqQuestion.service";

const getAll = catchAsync(async (req, res) => {
  const faqQuestions = await faqQuestionService.getAll(req.query);

  if (faqQuestions.length <= 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data found",
      data: faqQuestions,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "FAQ Questions fetched successfully",
    data: faqQuestions,
  });
});

const create = catchAsync(async (req, res) => {
  const product = await faqQuestionService.create(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "FAQ Question created successfully",
    data: product,
  });
});

export const faqQuestionController = {
  getAll,
  create,
};
