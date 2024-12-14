import httpStatus from "http-status";
import { z } from "zod";
import { PaginatedQueryBuilder } from "../../builders";
import { AppError } from "../../errors";
import { Category } from "./category.model";
import { categoryValidation } from "./category.validation";

const getAll = async (query: Record<string, unknown>) => {
  const queryBuilder = new PaginatedQueryBuilder(
    Category.find(),
    query,
    "/api/v1/categories",
  );

  const result = await queryBuilder
    .filter()
    .sort()
    .selectFields()
    .paginate()
    .execute();

  return result;
};

const create = async (
  payload: z.infer<typeof categoryValidation.create>["body"],
) => {
  const category = await Category.findOne({ name: payload.name });
  if (category) {
    throw new AppError(httpStatus.CONFLICT, "Category already exists");
  }
  return Category.create(payload);
};

export const categoryService = {
  create,
  getAll,
};
