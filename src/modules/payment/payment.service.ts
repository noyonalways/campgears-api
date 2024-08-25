import Order from "../order/order.model";
import { verifyPayment } from "./payment.utils";

const confirmation = async (transactionId: string, sessionId: string) => {
  const verifySession = await verifyPayment(sessionId);
  let order;
  if (verifySession.payment_status === "paid") {
    order = Order.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "paid", paidAt: new Date() },
      { new: true },
    );
  }
  return order;
};

const deleteCancelPaymentOrder = async (transactionId: string) => {
  const order = Order.findOneAndDelete({ transactionId });
  return order;
};

export const paymentServices = {
  confirmation,
  deleteCancelPaymentOrder,
};
