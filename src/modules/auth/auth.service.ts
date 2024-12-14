import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { z } from "zod";
import config from "../../config";
import { AppError } from "../../errors";
import Profile from "../profile/profile.model";
import User from "../user/user.model";
import { authValidation } from "./auth.validation";

const register = async (
  payload: z.infer<typeof authValidation.register>["body"],
) => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User already registered");
  }

  const session = await User.startSession();
  try {
    session.startTransaction();

    const newUser = await User.create([{ ...payload }], { session });
    if (!newUser.length) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to register user",
      );
    }

    const userProfile = await Profile.create(
      [{ user: newUser[0]._id, ...payload }],
      {
        session,
      },
    );
    if (!userProfile.length) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create user profile",
      );
    }

    await session.commitTransaction();
    session.endSession();

    return userProfile[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const login = async (payload: z.infer<typeof authValidation.login>["body"]) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (!(await User.isPasswordMatch(payload.password, user.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials");
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = User.createToken(
    jwtPayload,
    config.JWT_ACCESS_TOKEN_SECRET!,
    config.JWT_ACCESS_TOKEN_EXPIRES_IN!,
  );
  const refreshToken = User.createToken(
    jwtPayload,
    config.JWT_REFRESH_TOKEN_SECRET!,
    config.JWT_REFRESH_TOKEN_EXPIRES_IN!,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// get me (current logged in user)
const getMe = async (payload: JwtPayload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

// generate new access token
const generateNewAccessToken = async (refreshToken: string) => {
  const decoded = User.verifyToken(
    refreshToken,
    config.JWT_REFRESH_TOKEN_SECRET!,
  );

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = User.createToken(
    jwtPayload,
    config.JWT_ACCESS_TOKEN_SECRET!,
    config.JWT_ACCESS_TOKEN_EXPIRES_IN!,
  );
  return accessToken;
};

// change password (current logged in user)
const changePassword = async (
  userData: JwtPayload,
  payload: z.infer<typeof authValidation.changePassword>["body"],
) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // check the is user status
  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  // check the password is correct
  if (!(await User.isPasswordMatch(payload.oldPassword, user.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password did not matched");
  }

  // hash new password
  const newHashedPassword = await User.generateHashPassword(
    payload.newPassword,
  );

  const session = await User.startSession();
  try {
    session.startTransaction();

    const updatedUser = await User.findOneAndUpdate(
      {
        email: userData.email,
        role: userData.role,
      },
      {
        password: newHashedPassword,
        passwordChangeAt: new Date(),
      },
      { new: true, runValidators: true, session },
    );
    if (!updatedUser) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update password",
      );
    }

    const userProfile = await Profile.findOne({
      user: updatedUser._id,
    }).session(session);
    if (!userProfile) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    await session.commitTransaction();
    session.endSession();

    return userProfile;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// forget password
const forgetPassword = async (email: string) => {
  // check the user is exist
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // check the user is already deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is already deleted");
  }

  // check the is user status
  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  // generate jwt token
  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const resetToken = User.createToken(
    jwtPayload,
    config.JWT_REFRESH_TOKEN_SECRET!,
    config.JWT_RESET_PASSWORD_EXPIRES_IN!,
  );

  // generate reset link
  // const resetUILink = `${config.RESET_PASSWORD_UI_URL}?email=${user?.email}&token=${resetToken}`;

  // send reset link to user email
  // await sendEmail({
  //   to: {
  //     name: user.fullName,
  //     address: user.email,
  //   },
  //   subject: "Reset Your Password within 30 minutes",
  //   text: "Reset Your Password within 30 minutes",
  //   html: generateResetPasswordEmail({
  //     resetPasswordLink: resetUILink,
  //     fullName: user.fullName,
  //   }),
  // });

  // eslint-disable-next-line no-console
  console.log(`Password reset link sent to ${user.email}`);
  return resetToken;
};

// reset password
const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  // check the use is exist or not
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // check the user is already deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is already deleted");
  }

  // check the is user status
  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  const decoded = User.verifyToken(token, config.JWT_RESET_PASSWORD_SECRET!);

  if (payload.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, "Access forbidden");
  }

  // generate new hashed password
  const newHashedPassword = await User.generateHashPassword(
    payload.newPassword,
  );

  const session = await User.startSession();
  try {
    session.startTransaction();

    const updatedUser = await User.findOneAndUpdate(
      {
        email: decoded.email,
        role: decoded.role,
      },
      {
        password: newHashedPassword,
        passwordChangeAt: new Date(),
      },
      { new: true, runValidators: true, session },
    );
    if (!updatedUser) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to reset password",
      );
    }

    const userProfile = await Profile.findOne({
      user: updatedUser._id,
    }).session(session);
    if (!userProfile) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    await session.commitTransaction();
    session.endSession();

    return userProfile;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const authService = {
  register,
  login,
  getMe,
  generateNewAccessToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
