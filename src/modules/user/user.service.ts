import httpStatus from "http-status";
import { PaginatedQueryBuilder } from "../../builders";
import AppError from "../../errors/AppError";
import Profile from "../profile/profile.model";
import { IUser } from "./user.interface";
import User from "./user.model";

// get all
const getAll = async (query: Record<string, unknown>) => {
  const queryBuilder = new PaginatedQueryBuilder(
    Profile.find(),
    query,
    "/api/v1/users",
  );

  const result = await queryBuilder
    .filter()
    .search()
    .sort()
    .selectFields()
    .populateFields(["user"])
    .paginate()
    .execute();

  return result;
};

// create
const create = (payload: IUser) => {
  return User.create(payload);
};

// get single
const getUserByProperty = (property: string, value: string) => {
  return User.getUserByProperty(property, value);
};

// update
const update = async (userId: string, payload: IUser) => {
  const user = await User.getUserByProperty("_id", userId);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  // Update other fields
  return User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
};

// delete
const deleteSingle = async (userId: string) => {
  const user = await User.getUserByProperty("_id", userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
};

export const userService = {
  getAll,
  create,
  getUserByProperty,
  update,
  deleteSingle,
};
