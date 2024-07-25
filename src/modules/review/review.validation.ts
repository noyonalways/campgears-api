import { z } from "zod";

const userValidationSchema = z.object(
  {
    fullName: z.string({
      required_error: "Full Name is required",
      invalid_type_error: "Full Name must be a string",
    }),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),
  },
  {
    required_error: "User is required",
    invalid_type_error: "User must be a object",
  },
);

const create = z.object({
  body: z.object({
    user: userValidationSchema,
    rating: z.number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    }),
    comment: z.string({
      required_error: "Comment is required",
      invalid_type_error: "Comment must be a string",
    }),
  }),
});

export const reviewValidationSchema = {
  create,
};
