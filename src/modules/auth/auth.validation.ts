import { z } from "zod";

const register = z.object({
  body: z
    .object({
      name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      }),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email("Provide a valid email address"),
      password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      }),
    })
    .strict(),
});

const login = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email("Provide a valid email address"),
      password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      }),
    })
    .strict(),
});

const refreshToken = z.object({
  cookies: z
    .object({
      refresh_token: z.string({
        invalid_type_error: "Refresh token must be a string",
        required_error: "Refresh token is required",
      }),
    })
    .strict(),
});

const changePassword = z.object({
  body: z
    .object({
      oldPassword: z
        .string({
          invalid_type_error: "Old password must be a string",
          required_error: "Old password is required",
        })
        .min(1, "Old password is required"),
      newPassword: z
        .string({
          invalid_type_error: "New password must be a string",
          required_error: "New password is required",
        })
        .min(1, "New password is required"),
    })
    .strict(),
});

const forgetPassword = z.object({
  body: z
    .object({
      email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      }),
    })
    .strict(),
});

const resetPassword = z.object({
  body: z
    .object({
      email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      }),
      newPassword: z
        .string({
          required_error: "New password is required",
          invalid_type_error: "New password must be a string",
        })
        .min(1, "New password is required"),
    })
    .strict(),
});

export const authValidation = {
  register,
  login,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
