import { Document, Model } from "mongoose";

export type TDiscountType = "percentage" | "fixed";

export interface IDiscount {
  code: string;
  type: TDiscountType;
  description: string;
  discountValue: number;
  active: boolean;
  startDate: Date;
  endDate: Date;
  itemsTotalPrice: number;
  amount: number;
  isDeleted: boolean;
}

export interface IDiscountModel extends Model<IDiscount> {
  getDiscountByProperty: (
    property: string,
    value: string,
  ) => Promise<(IDiscount & Document) | null>;
}
