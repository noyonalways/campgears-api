import httpStatus from "http-status";
import QueryBuilder from "mongoose-dynamic-querybuilder";
import AppError from "../../errors/AppError";
import { productService } from "../product/product.service";
import { IReview } from "./review.interface";
import Review from "./review.model";

// create review (user)
const create = async (productId: string, payload: IReview) => {
  const product = await productService.getSingle("_id", productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product Not found");
  }
  return Review.create({ ...payload, product: productId });
};

// get all reviews by productId
const getReviewsByProductId = (
  productId: string,
  query: Record<string, unknown>,
) => {
  const orderQuery = new QueryBuilder(
    Review.find({ product: productId }).populate("product"),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  return orderQuery.modelQuery;
};

// get all review (admin)
const getAll = (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Review.find({}), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  return orderQuery.modelQuery;
};

export const reviewService = {
  create,
  getAll,
  getReviewsByProductId,
};
