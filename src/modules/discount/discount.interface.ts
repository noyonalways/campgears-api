import { Model } from "mongoose";

export type TDiscountType = "percentage" | "fixed";

export interface IDiscount {
  code: string;
  type: TDiscountType;
  description: string;
  discountValue: number;
  active: boolean;
  startDate: Date;
  endDate: Date;
  isDeleted: boolean;
}

export interface IDiscountModel extends Model<IDiscount> {}
