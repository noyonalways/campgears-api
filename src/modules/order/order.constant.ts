import {
  TOrderStatus,
  TPaymentMethod,
  TPaymentStatus,
} from "./order.interface";

export const OrderStatus: TOrderStatus[] = [
  "pending",
  "shipped",
  "delivered",
  "cancelled",
];

export const PaymentMethods: TPaymentMethod[] = ["cash", "stripe"];
export const PaymentStatus: TPaymentStatus[] = [
  "pending",
  "succeeded",
  "failed",
];
