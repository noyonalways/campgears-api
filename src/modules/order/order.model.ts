import httpStatus from "http-status";
import { Schema, isValidObjectId, model } from "mongoose";
import AppError from "../../errors/AppError";
import { OrderStatus, PaymentMethods, PaymentStatus } from "./order.constant";
import { IOrder, IOrderItem, IOrderModel } from "./order.interface";

const discountSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Discount code is required"],
    },
    amount: {
      type: Number,
      required: [true, "Discount amount is required"],
    },
    description: {
      type: String,
      required: [true, "Discount description is required"],
    },
  },
  { _id: false },
);

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, "Order item name is required"],
    },
    price: {
      type: Number,
      required: [true, "Order item price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Order item quantity is required"],
    },
    totalPrice: {
      type: Number,
    },
    image: {
      type: String,
      required: [true, "Order item image is required"],
    },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder, IOrderModel>(
  {
    userFullName: {
      type: String,
      required: [true, "User full name is required"],
    },
    userEmail: {
      type: String,
      required: [true, "User email is required"],
    },
    userPhone: {
      type: String,
      required: [true, "User phone is required"],
    },
    transactionId: {
      type: String,
      required: [true, "Transaction ID is required"],
    },
    orderItems: {
      type: [orderItemSchema],
      required: [true, "Order items is required"],
    },
    shippingAddress: {
      type: String,
      required: [true, "Shipping address is required"],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: PaymentMethods,
        message: "{VALUE} is not supported",
      },
      required: [true, "Payment method is required"],
    },
    status: {
      type: String,
      enum: {
        values: OrderStatus,
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },
    itemsPrice: {
      type: Number,
      required: [true, "Items price is required"],
      default: 0,
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      type: String,
      enum: {
        values: PaymentStatus,
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },
    paidAt: {
      type: Date,
      default: null,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    discount: {
      type: discountSchema,
      default: null,
    },

    tax: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalPriceAfterDiscount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

orderSchema.statics.getOrderByProperty = async function (
  property: string,
  value: string,
) {
  if (property === "_id") {
    if (!isValidObjectId(value)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid ObjectId");
    }
    return this.findById(value);
  }
  return this.findOne({ [property]: value });
};

const Order = model<IOrder, IOrderModel>("Order", orderSchema);
export default Order;
