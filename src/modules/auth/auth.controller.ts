import httpStatus from "http-status";
import { catchAsync, sendResponse } from "../../utils";

const register = catchAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User register successfully",
    data: "user",
  });
});

const login = catchAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: "user",
  });
});

export const authController = {
  register,
  login,
};
