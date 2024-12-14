import httpStatus from "http-status";
import { catchAsync, sendResponse } from "../../utils";
import { categoryService } from "./category.service";

const create = catchAsync(async (req, res) => {
  const category = await categoryService.create(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Category created successfully",
    data: category,
  });
});

const getAll = catchAsync(async (req, res) => {
  const { data, pagination } = await categoryService.getAll(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories fetched successfully",
    data,
    meta: pagination,
  });
});

export const categoryController = {
  create,
  getAll,
};
