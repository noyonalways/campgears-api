import httpStatus from "http-status";
import { catchAsync, sendResponse } from "../../utils";
import { orderService } from "./order.service";

// create
const create = catchAsync(async (req, res) => {
  const order = await orderService.create(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order created successfully",
    data: order,
  });
});

// get all
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

// get order by order id
const getSingle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await orderService.getSingle("_id", id);
  if (!product) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Order not found",
      data: undefined,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order fetched successfully",
    data: product,
  });
});

export const orderController = {
  create,
  getAll,
  getSingle,
};
