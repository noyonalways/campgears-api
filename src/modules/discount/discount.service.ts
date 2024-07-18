import QueryBuilder from "mongoose-dynamic-querybuilder";
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

const getDiscountByCode = async (code: string, itemsTotalPrice: number) => {
  const discount = await Discount.getDiscountByProperty("code", code);

  if (!discount) {
    throw new Error("Discount not found");
  }

  if (!discount.active) {
    throw new Error("Discount is not active");
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

  discount.amount = discountAmount;

  return discount.save();
};

export const discountService = {
  create,
  getAll,
  getDiscountByCode,
};
