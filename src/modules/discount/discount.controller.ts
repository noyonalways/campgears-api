import httpStatus from "http-status";
import { catchAsync, sendResponse } from "../../utils";
import { discountService } from "./discount.service";

// create
const create = catchAsync(async (req, res) => {
  const discount = await discountService.create(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order created successfully",
    data: discount,
  });
});

// get all
const getAll = catchAsync(async (req, res) => {
  const { data, pagination } = await discountService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Discounts fetched successfully",
    data,
    meta: pagination,
  });
});

// apply discount by code
const applyDiscountByCode = catchAsync(async (req, res) => {
  const { code } = req.params;
  const { itemsTotalPrice } = req.body;
  const product = await discountService.applyDiscountByCode(
    code,
    itemsTotalPrice,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Discount fetched successfully",
    data: product,
  });
});

export const discountController = {
  create,
  getAll,
  applyDiscountByCode,
};
