import { Schema, model } from "mongoose";
import { DiscountType } from "./discount.constant";
import { IDiscount, IDiscountModel } from "./discount.interface";

const discountSchema = new Schema<IDiscount, IDiscountModel>(
  {
    code: {
      type: String,
      required: [true, "Code is required"],
      unique: true,
    },
    discountValue: {
      type: Number,
      required: [true, "Discount value is required"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
    type: {
      type: String,
      enum: {
        values: DiscountType,
        message: "{VALUE} Invalid discount type",
      },
      required: [true, "Type is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Discount = model<IDiscount, IDiscountModel>("Discount", discountSchema);
export default Discount;
