import { IOrder } from "./order.interface";
import Order from "./order.model";

const create = async (payload: IOrder) => {
  const { orderItems, ...restProperties } = payload;

  // calculate items price
  payload.itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  // calculate total price
  payload.totalPrice = payload.itemsPrice + payload.shippingCost + payload.tax;

  // calculate price after discount
  if (payload?.discount) {
    payload.totalPriceAfterDiscount =
      payload.totalPrice - payload?.discount?.amount;
  } else {
    payload.totalPriceAfterDiscount = payload.totalPrice;
  }

  const orderData = {
    ...restProperties,
    orderItems,
    itemsPrice: payload.itemsPrice,
    totalPrice: payload.totalPrice,
    totalPriceAfterDiscount: payload.totalPriceAfterDiscount,
  };

  return Order.create(orderData);
};

export const orderService = {
  create,
};
