import httpStatus from "http-status";
import { Schema, isValidObjectId, model } from "mongoose";
import AppError from "../../errors/AppError";
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
    itemsTotalPrice: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number,
      default: 0,
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

discountSchema.statics.getDiscountByProperty = function (
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

const Discount = model<IDiscount, IDiscountModel>("Discount", discountSchema);
export default Discount;
