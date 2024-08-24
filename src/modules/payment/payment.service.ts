import Order from "../order/order.model";
import { verifyPayment } from "./payment.utils";

const confirmation = async (transactionId: string, sessionId: string) => {
  const verifySession = await verifyPayment(sessionId);
  let order;
  if (verifySession.payment_status === "paid") {
    order = Order.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "paid", paidAt: new Date() },
    );
  }
  return order;
};

export const paymentServices = {
  confirmation,
};
