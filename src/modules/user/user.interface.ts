import { JwtPayload } from "jsonwebtoken";
import { Model } from "mongoose";

export type TUserStatus = "active" | "inactive" | "blocked";
export type TUserRole = "super-admin" | "admin" | "user";
export type TAuthProvider = "google" | "github" | "facebook";

export interface IUser {
  email: string;
  password: string;
  status: TUserStatus;
  role: TUserRole;
  isDeleted: boolean;
  needsPasswordChange?: boolean;
  passwordChangeAt?: Date;
  authProvider?: TAuthProvider;
}

export interface IUserModel extends Model<IUser> {
  getUserByProperty(property: string, value: string): Promise<IUser | null>;

  generateHashPassword(
    plainTextPassword: string,
    saltRound?: number,
  ): Promise<string>;

  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  createToken(
    jwtPayload: JwtPayload,
    secret: string,
    expiresIn: string,
  ): string;

  verifyToken(token: string, secret: string): JwtPayload;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
