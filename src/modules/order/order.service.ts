import mongoose from "mongoose";
import QueryBuilder from "mongoose-dynamic-querybuilder";
import { uid } from "uid";
import AppError from "../../errors/AppError";
import Discount from "../discount/discount.model";
import { initialSession } from "../payment/payment.utils";
import Product from "../product/product.model";
import { IDiscount, IOrder } from "./order.interface";
import Order from "./order.model";

const create = async (payload: IOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { orderItems, discount, ...restProperties } = payload;

    const updatedOrderItems = [];

    // Check if all order items exist and have sufficient stock
    for (const item of orderItems) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        throw new AppError(
          404,
          `Product with id '${item.productId}' not found`,
        );
      }
      if (product.stockQuantity < item.quantity) {
        throw new AppError(
          400,
          `Product with id '${item.productId}' has insufficient stock`,
        );
      }
      // Update the stock quantity for each product
      product.stockQuantity -= item.quantity;
      const updatedProduct = await product.save({ session });
      if (!updatedProduct) {
        throw new AppError(400, "Failed to update product stock");
      }

      // Update order item with actual price and name from the product
      updatedOrderItems.push({
        productId: item.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        totalPrice: product.price * item.quantity,
        image: product.image,
      });
    }

    // Calculate items price
    const itemsPrice = updatedOrderItems.reduce((acc, item) => {
      return acc + item.totalPrice;
    }, 0);

    // Calculate total price
    const shippingCost = payload.shippingCost || 0;
    const tax = payload.tax || 0;
    const totalPrice: number = itemsPrice + shippingCost + tax;

    let totalPriceAfterDiscount;
    let discountInDB;
    let discountAmount = 0;

    if (!discount) {
      // Calculate price after discount
      totalPriceAfterDiscount = totalPrice;
    } else {
      // TODO: add discount validation
      discountInDB = await Discount.findOne({
        code: discount.code,
      }).session(session);

      if (!discountInDB) {
        throw new AppError(404, "Discount not found");
      }

      if (!discountInDB.active) {
        throw new AppError(400, "Discount is not active");
      }

      if (discountInDB.type === "percentage") {
        discountAmount = parseFloat(
          ((totalPrice * discountInDB.discountValue) / 100).toFixed(2),
        );
        totalPriceAfterDiscount = totalPrice - discountAmount;
      }
      if (discountInDB.type === "fixed") {
        discountAmount = discountInDB.discountValue;
        totalPriceAfterDiscount = totalPrice - discountAmount;
      }

      totalPriceAfterDiscount = totalPrice - discountAmount;
    }

    // Modify discount object to send to the order
    const modifiedDiscount: IDiscount | null = discount
      ? {
          amount: discountAmount,
          code: discountInDB?.code || "",
          description: discountInDB?.description || "",
        }
      : null;

    if (discountInDB) {
      discountInDB.amount = 0;
      await discountInDB.save({ session });
    }

    let paymentMethod;
    let paymentSession;
    const transactionId = `TXN-${uid()}`;

    if (restProperties.paymentMethod === "stripe") {
      paymentSession = await initialSession({
        customerEmail: restProperties.userEmail,
        items: updatedOrderItems,
        shippingCost,
        transactionId,
      });
      paymentMethod = "stripe";
    }

    if (restProperties.paymentMethod === "cash") {
      paymentMethod = "cash";
    }

    const orderData = {
      ...restProperties,
      orderItems: updatedOrderItems,
      itemsPrice,
      totalPrice,
      totalPriceAfterDiscount,
      discount: modifiedDiscount,
      paymentMethod,
      transactionId,
    };

    // Create the order
    const order = await Order.create([orderData], { session });
    if (order.length === 0) {
      throw new AppError(400, "Failed to create order");
    }

    await session.commitTransaction();
    session.endSession();

    return {
      transactionId,
      email: restProperties.userEmail,
      sessionId: paymentSession?.id,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAll = (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find({}), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  return orderQuery.modelQuery;
};

const getSingle = (property: string, value: string) => {
  return Order.getOrderByProperty(property, value);
};

export const orderService = {
  create,
  getAll,
  getSingle,
};
