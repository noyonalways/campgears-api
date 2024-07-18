import httpStatus from "http-status";
import { catchAsync, sendResponse } from "../../utils";
import { orderService } from "./order.service";

const create = catchAsync(async (req, res) => {
  const order = await orderService.create(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order created successfully",
    data: order,
  });
});

const getAll = catchAsync(async (req, res) => {
  const orders = await orderService.getAll(req.query);

  if (orders.length <= 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data found",
      data: orders,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders fetched successfully",
    data: orders,
  });
});

export const orderController = {
  create,
  getAll,
};
