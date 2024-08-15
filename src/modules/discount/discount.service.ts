import QueryBuilder from "mongoose-dynamic-querybuilder";
import AppError from "../../errors/AppError";
import { IDiscount } from "./discount.interface";
import Discount from "./discount.model";

const create = (payload: IDiscount) => {
  return Discount.create(payload);
};

const getAll = (query: Record<string, unknown>) => {
  const discountQuery = new QueryBuilder(Discount.find({}), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  return discountQuery.modelQuery;
};

const applyDiscountByCode = async (code: string, itemsTotalPrice: number) => {
  const discount = await Discount.getDiscountByProperty("code", code);

  if (!discount) {
    throw new AppError(400, "Invalid Discount code");
  }

  if (!discount.active) {
    throw new AppError(400, "Discount is not active");
  }

  let discountAmount = 0;
  if (discount.type === "percentage") {
    discountAmount = parseFloat(
      ((itemsTotalPrice * discount.discountValue) / 100).toFixed(2),
    );
  }
  if (discount.type === "fixed") {
    discountAmount = discount.amount;
  }

  discount.itemsTotalPrice = itemsTotalPrice;
  discount.amount = discountAmount;

  return discount;
};

export const discountService = {
  create,
  getAll,
  applyDiscountByCode,
};
