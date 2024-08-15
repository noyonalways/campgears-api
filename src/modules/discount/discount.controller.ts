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
  const discounts = await discountService.getAll(req.query);

  if (discounts.length <= 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data found",
      data: discounts,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Discounts fetched successfully",
    data: discounts,
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
