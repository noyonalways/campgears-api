import { Schema, model } from "mongoose";
import { IReview, IUser } from "./review.interface";

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
  },
  { _id: false },
);

const reviewSchema = new Schema<IReview>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: [true, "Product id is required"],
      ref: "Product",
    },
    user: {
      type: userSchema,
      required: [true, "User is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Review = model<IReview>("Review", reviewSchema);
export default Review;
