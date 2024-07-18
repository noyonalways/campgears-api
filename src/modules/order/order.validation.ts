import mongoose from "mongoose";
import { z } from "zod";
import { PaymentMethods } from "./order.constant";

const orderItemValidationSchema = z.object({
  productId: z
    .string({
      required_error: "Product id is required",
      invalid_type_error: "Product id must be a string",
    })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "invalid product id",
    }),
  name: z.string({
    required_error: "Product name is required",
    invalid_type_error: "Product name must be a string",
  }),
  price: z.number({
    required_error: "Product price is required",
    invalid_type_error: "Product price must be a number",
  }),
  quantity: z.number({
    required_error: "Product quantity is required",
    invalid_type_error: "Product quantity must be a number",
  }),
  image: z.string({
    required_error: "Product image is required",
    invalid_type_error: "Product image must be a string",
  }),
});

const discountValidationSchema = z
  .object({
    code: z.string({
      required_error: "Discount code is required",
      invalid_type_error: "Discount code must be a string",
    }),
    amount: z.number({
      required_error: "Discount amount is required",
      invalid_type_error: "Discount amount must be a number",
    }),
    description: z.string({
      required_error: "Discount description is required",
      invalid_type_error: "Discount description must be a string",
    }),
  })
  .nullable()
  .optional();

const create = z.object({
  body: z
    .object({
      userFullName: z.string({
        required_error: "Full name is required",
        invalid_type_error: "Full name must be a string",
      }),
      userEmail: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      }),
      userPhone: z.string({
        required_error: "Phone is required",
        invalid_type_error: "Phone must be a string",
      }),
      shippingAddress: z.string({
        required_error: "Shipping address is required",
        invalid_type_error: "Shipping address must be a string",
      }),
      paymentMethod: z.enum([...PaymentMethods] as [string, ...string[]]),
      shippingCost: z.number({
        required_error: "Shipping cost is required",
        invalid_type_error: "Shipping cost must be a number",
      }),
      orderItems: z.array(orderItemValidationSchema),
      discount: discountValidationSchema,
      tax: z.number({
        required_error: "Tax is required",
        invalid_type_error: "Tax must be a number",
      }),
    })
    .strict(),
});

export const orderValidationSchema = {
  create,
};
