import { Document, Model, Types } from "mongoose";

export type TOrderStatus = "pending" | "shipped" | "delivered" | "cancelled";
export type TPaymentMethod = "cash" | "stripe";
export type TPaymentStatus = "pending" | "paid" | "failed";

export interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  image: string;
}

export interface IDiscount {
  code: string;
  amount: number;
  description: string;
}

export interface IOrder {
  userFullName: string;
  userEmail: string;
  userPhone: string;
  transactionId: string;
  orderItems: IOrderItem[];
  shippingAddress: string;
  paymentMethod: TPaymentMethod;
  itemsPrice: number;
  tax: number;
  shippingCost: number;
  totalPrice: number;
  paymentStatus: TPaymentStatus;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  status: TOrderStatus;
  discount: IDiscount;
  totalPriceAfterDiscount?: number;
}

export interface IOrderModel extends Model<IOrder> {
  getOrderByProperty(
    property: string,
    value: string,
  ): Promise<(IOrder & Document) | null>;
}
