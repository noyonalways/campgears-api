import mongoose from "mongoose";
import QueryBuilder from "mongoose-dynamic-querybuilder";
import AppError from "../../errors/AppError";
import Discount from "../discount/discount.model";
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
    const totalPrice = itemsPrice + shippingCost + tax;

    let totalPriceAfterDiscount;
    let discountInDB;

    if (!discount) {
      // Calculate price after discount
      totalPriceAfterDiscount = totalPrice;
    } else {
      // TODO: add discount validation
      discountInDB = await Discount.getDiscountByProperty(
        "code",
        discount.code,
      );
      if (!discountInDB) {
        throw new AppError(404, "Discount not found");
      }

      if (!discountInDB.active) {
        throw new AppError(400, "Discount is not active");
      }

      totalPriceAfterDiscount = totalPrice - discountInDB.amount;
    }

    // Modify discount object to send to the order
    const modifiedDiscount: IDiscount = {
      amount: discountInDB?.amount || 0,
      code: discountInDB?.code || "",
      description: discountInDB?.description || "",
    };

    const orderData = {
      ...restProperties,
      orderItems: updatedOrderItems,
      itemsPrice,
      totalPrice,
      totalPriceAfterDiscount,
      discount: modifiedDiscount,
    };

    // Create the order
    const order = await Order.create([orderData], { session });
    if (order.length === 0) {
      throw new AppError(400, "Failed to create order");
    }

    await session.commitTransaction();
    session.endSession();

    return order[0];
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

export const orderService = {
  create,
  getAll,
};
