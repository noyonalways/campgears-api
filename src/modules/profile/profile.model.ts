import { model, Schema } from "mongoose";
import { Genders } from "./profile.constant";
import { IProfile } from "./profile.interface";

const profileSchema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    avatar: {
      type: String,
      trim: true,
      default: "",
    },
    gender: {
      type: String,
      enum: {
        values: Genders,
        message: "{VALUE} is not a valid gender",
      },
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
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

profileSchema.pre("find", function (this, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

profileSchema.pre("findOne", function (this, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

profileSchema.pre("findOneAndUpdate", function (this, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const Profile = model<IProfile>("Profile", profileSchema);
export default Profile;
