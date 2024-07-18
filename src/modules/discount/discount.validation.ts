import { z } from "zod";
import { DiscountType } from "./discount.constant";

const create = z.object({
  body: z
    .object({
      code: z.string({
        required_error: "Code is required",
        invalid_type_error: "Code must be a string",
      }),
      discountValue: z.number({
        required_error: "Discount value is required",
        invalid_type_error: "Discount value must be a number",
      }),
      description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
      }),
      startDate: z
        .string({
          required_error: "Start date is required",
          invalid_type_error: "Start date must be a string",
        })
        .datetime()
        .optional(),
      endDate: z
        .string({
          required_error: "End date is required",
          invalid_type_error: "End date must be a string",
        })
        .datetime(),
      type: z.enum([...(DiscountType as [string, ...string[]])], {
        required_error: "Type is required",
        invalid_type_error: "Type must be a string",
      }),
    })
    .strict(),
});

const applyDiscountByCode = z.object({
  body: z
    .object({
      itemsTotalPrice: z.number({
        required_error: "Items total price is required",
        invalid_type_error: "Items total price must be a number",
      }),
    })
    .strict(),
});

export const discountValidation = {
  create,
  applyDiscountByCode,
};
