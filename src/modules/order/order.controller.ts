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

export const orderController = {
  create,
};
