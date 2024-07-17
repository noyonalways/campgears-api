import httpStatus from "http-status";
import { Schema, isValidObjectId, model } from "mongoose";
import AppError from "../../errors/AppError";
import { UserRoles, UserStatus } from "./user.constant";
import { IUser, IUserModel } from "./user.interface";

const userSchema = new Schema<IUser, IUserModel>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [50, "Full name must be less than 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    role: {
      type: String,
      enum: {
        values: UserRoles,
        message: "{VALUE} is not a valid role",
      },
      default: "user",
    },
    status: {
      type: String,
      enum: {
        values: UserStatus,
        message: "{VALUE} is not a valid status",
      },
      default: "active",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("find", function (this, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre("findOne", function (this, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre("findOneAndUpdate", function (this, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.statics.getUserByProperty = async function (
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

const User = model<IUser, IUserModel>("User", userSchema);
export default User;
