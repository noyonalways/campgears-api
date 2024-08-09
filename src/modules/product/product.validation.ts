import { z } from "zod";
import { ProductStatus } from "./product.constant";

const create = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "Name is required",
          invalid_type_error: "Name must be string",
        })
        .min(1, { message: "Name must be at least 1 character" }),
      description: z
        .string({
          required_error: "Description is required",
          invalid_type_error: "Description must be string",
        })
        .min(10, { message: "Description must be at least 10 characters" }),
      price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be number",
      }),
      stockQuantity: z.number({
        required_error: "Stock quantity is required",
        invalid_type_error: "Stock quantity must be number",
      }),
      status: z.enum([...ProductStatus] as [string, ...string[]]).optional(),
      brand: z.string({
        required_error: "Brand is required",
        invalid_type_error: "Brand must be string",
      }),
      color: z.string({
        required_error: "Color is required",
        invalid_type_error: "Color must be string",
      }),
      category: z.string({
        required_error: "Category is required",
        invalid_type_error: "Category must be string",
      }),
      subCategory: z.string({
        required_error: "Sub category is required",
        invalid_type_error: "Sub category must be string",
      }),
      image: z.string({
        required_error: "Image is required",
        invalid_type_error: "Image must be string",
      }),
      isFeatured: z
        .boolean({
          required_error: "Is featured is required",
          invalid_type_error: "Is featured must be boolean",
        })
        .optional(),
      tags: z.array(
        z.string({
          required_error: "Tag is required",
          invalid_type_error: "Tag must be string",
        }),
        {
          required_error: "Tags is required",
          invalid_type_error: "Tags must be an array of strings",
        },
      ),
      galleryImages: z
        .array(
          z.object({
            url: z.string({
              required_error: "Url is required",
              invalid_type_error: "Url must be string",
            }),
            alt: z.string({
              required_error: "Alt is required",
              invalid_type_error: "Alt must be string",
            }),
          }),
        )
        .optional(),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "Name is required",
          invalid_type_error: "Name must be string",
        })
        .min(1, { message: "Name must be at least 1 character" })
        .optional(),
      description: z
        .string({
          required_error: "Description is required",
          invalid_type_error: "Description must be string",
        })
        .min(10, { message: "Description must be at least 10 characters" })
        .optional(),
      price: z
        .number({
          required_error: "Price is required",
          invalid_type_error: "Price must be number",
        })
        .optional(),
      stockQuantity: z
        .number({
          required_error: "Stock quantity is required",
          invalid_type_error: "Stock quantity must be number",
        })
        .optional(),
      status: z.enum([...ProductStatus] as [string, ...string[]]).optional(),
      brand: z
        .string({
          required_error: "Brand is required",
          invalid_type_error: "Brand must be string",
        })
        .optional(),
      color: z
        .string({
          required_error: "Color is required",
          invalid_type_error: "Color must be string",
        })
        .optional(),
      category: z
        .string({
          required_error: "Category is required",
          invalid_type_error: "Category must be string",
        })
        .optional(),
      subCategory: z
        .string({
          required_error: "Sub category is required",
          invalid_type_error: "Sub category must be string",
        })
        .optional(),
      image: z
        .string({
          required_error: "Image is required",
          invalid_type_error: "Image must be string",
        })
        .optional(),
      isFeatured: z
        .boolean({
          required_error: "Is featured is required",
          invalid_type_error: "Is featured must be boolean",
        })
        .optional(),
      tags: z
        .array(
          z.string({
            required_error: "Tags is required",
            invalid_type_error: "Tags must be array",
          }),
          {
            required_error: "Tags is required",
            invalid_type_error: "Tags must be array",
          },
        )
        .optional(),
      galleryImages: z
        .array(
          z.object({
            url: z.string({
              required_error: "Url is required",
              invalid_type_error: "Url must be string",
            }),
            alt: z.string({
              required_error: "Alt is required",
              invalid_type_error: "Alt must be string",
            }),
          }),
        )
        .optional(),
    })
    .strict(),
});

export const productValidationSchema = {
  create,
  update,
};
