import { Types } from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
}

export interface IReview {
  product: Types.ObjectId;
  user: IUser;
  rating: number;
  comment: string;
}
