import httpStatus from "http-status";
import { catchAsync, sendResponse } from "../../utils";
import { paymentServices } from "./payment.service";

const confirmation = catchAsync(async (req, res) => {
  const { transactionId, sessionId } = req.query;
  const order = await paymentServices.confirmation(
    transactionId as string,
    sessionId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order placed successfully",
    data: order,
  });
});

const deleteCancelPaymentOrder = catchAsync(async (req, res) => {
  const { transactionId } = req.query;
  const order = await paymentServices.deleteCancelPaymentOrder(
    transactionId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order deleted successfully",
    data: order,
  });
});

export const paymentController = {
  confirmation,
  deleteCancelPaymentOrder,
};
