import { z } from "zod";
import { UserRoles, UserStatus } from "./user.constant";

const create = z.object({
  body: z
    .object({
      fullName: z.string({
        required_error: "Full name is required",
        invalid_type_error: "Full name must be a string",
      }),
      email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      }),
      password: z
        .string({
          required_error: "Password is required",
          invalid_type_error: "Password must be a string",
        })
        .min(6, { message: "Password must be at least 6 characters" }),
      phone: z
        .string({
          invalid_type_error: "Phone must be a string",
          required_error: "Phone is required",
        })
        .optional(),
      address: z.string({
        invalid_type_error: "Address must be a string",
        required_error: "Address is required",
      }),
      profileImage: z.string({
        invalid_type_error: "Profile image must be a string",
        required_error: "Profile image is required",
      }),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      fullName: z
        .string({
          required_error: "Full name is required",
          invalid_type_error: "Full name must be a string",
        })
        .optional(),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .optional(),
      password: z
        .string({
          required_error: "Password is required",
          invalid_type_error: "Password must be a string",
        })
        .min(6, { message: "Password must be at least 6 characters" })
        .optional(),
      phone: z
        .string({
          invalid_type_error: "Phone must be a string",
          required_error: "Phone is required",
        })
        .optional(),
      address: z
        .string({
          invalid_type_error: "Address must be a string",
          required_error: "Address is required",
        })
        .optional(),
      profileImage: z
        .string({
          invalid_type_error: "Profile image must be a string",
          required_error: "Profile image is required",
        })
        .optional(),
      role: z.enum([...UserRoles] as [string, ...string[]]).optional(),
      status: z.enum([...UserStatus] as [string, ...string[]]).optional(),
    })
    .strict(),
});

export const userValidationSchema = {
  create,
  update,
};
