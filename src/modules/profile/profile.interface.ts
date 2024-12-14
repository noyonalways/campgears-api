import { Document, Types } from "mongoose";

export type TGender = "male" | "female" | "others";

export interface IProfile extends Document {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: TGender;
  avatar: string;
  dateOfBirth?: Date;
  isDeleted: boolean;
}
