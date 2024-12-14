import httpStatus from "http-status";
import config from "../../config";
import { AppError } from "../../errors";
import { catchAsync, sendResponse } from "../../utils";
import { authService } from "./auth.service";

const register = catchAsync(async (req, res) => {
  const userProfile = await authService.register(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User register successfully",
    data: userProfile,
  });
});

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.login(req.body);

  res.cookie("refresh_token", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 60 * 365,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

// generate access token via refresh token
const generateNewAccessToken = catchAsync(async (req, res) => {
  const { refresh_token } = req.cookies;

  const newAccessToken =
    await authService.generateNewAccessToken(refresh_token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token retrieved successfully",
    data: { accessToken: newAccessToken },
  });
});

// change password (current logged in user)
const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

// get me (current logged in user)
const getMe = catchAsync(async (req, res) => {
  const user = await authService.getMe(req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User fetched successfully",
    data: user,
  });
});

// forget password
const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await authService.forgetPassword(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset link sent successfully",
    data: result,
  });
});

// reset password
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError(httpStatus.FORBIDDEN, "Access Forbidden");
  }

  const result = await authService.resetPassword(req.body, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});

export const authController = {
  register,
  login,
  getMe,
  generateNewAccessToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
