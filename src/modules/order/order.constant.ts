import { TOrderStatus, TPaymentMethod } from "./order.interface";

export const OrderStatus: TOrderStatus[] = [
  "pending",
  "shipped",
  "delivered",
  "cancelled",
];

export const PaymentMethods: TPaymentMethod[] = ["cash", "stripe"];
