import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Schema, model } from "mongoose";
import config from "../../config";
import { UserRoles, UserStatus } from "./user.constant";
import { IUser, IUserModel } from "./user.interface";

const userSchema = new Schema<IUser, IUserModel>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
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
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    passwordChangeAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    Number(config.BCRYPT_SALT_ROUND),
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

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

// user static methods
userSchema.statics.isPasswordMatch = function (
  plainTextPassword: string,
  hashedPassword,
) {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.generateHashPassword = async function (
  plainTextPassword: string,
) {
  return await bcrypt.hash(plainTextPassword, Number(config.BCRYPT_SALT_ROUND));
};

userSchema.statics.createToken = function (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

userSchema.statics.verifyToken = function (token: string, secret: string) {
  return jwt.verify(token, secret);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

const User = model<IUser, IUserModel>("User", userSchema);
export default User;
