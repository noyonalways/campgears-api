import { Document, Model } from "mongoose";

export type TUserStatus = "active" | "inactive" | "blocked";
export type TUserRole = "admin" | "user";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  status: TUserStatus;
  profileImage: string;
  phone: string;
  address: string;
  role: TUserRole;
  isDeleted: boolean;
}

export interface IUserModel extends Model<IUser> {
  getUserByProperty(
    property: string,
    value: string,
  ): Promise<(IUser & Document) | null>;
}
