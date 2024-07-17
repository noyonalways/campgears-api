import httpStatus from "http-status";
import { catchAsync, sendResponse } from "../../utils";
import { userService } from "./user.service";

const getAll = catchAsync(async (req, res) => {
  const users = await userService.getAll(req.query);

  if (users.length <= 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data found",
      data: users,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users fetched successfully",
    data: users,
  });
});

const create = catchAsync(async (req, res) => {
  const user = await userService.create(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User created successfully",
    data: user,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserByProperty("_id", id);
  if (!user) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "User not found",
      data: undefined,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User fetched successfully",
    data: user,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.update(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User updated successfully",
    data: user,
  });
});

const deleteSingle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.deleteSingle(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
    data: user,
  });
});

export const productController = {
  getAll,
  create,
  getSingle,
  update,
  deleteSingle,
};
