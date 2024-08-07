import httpStatus from "http-status";
import QueryBuilder from "mongoose-dynamic-querybuilder";
import AppError from "../../errors/AppError";
import { SearchFields } from "./product.constant";
import { IProduct } from "./product.interface";
import Product from "./product.model";

const getAll = (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find({}), query)
    .filter()
    .sort()
    .paginate()
    .fields()
    .search(SearchFields);
  return productQuery.modelQuery;
};

const create = (payload: IProduct) => {
  return Product.create(payload);
};

const getSingle = (property: string, value: string) => {
  return Product.getProductByProperty(property, value);
};

const update = async (productId: string, payload: IProduct) => {
  // const { galleryImages, ...otherFields } = payload;
  const product = await Product.getProductByProperty("_id", productId);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product not found");
  }

  // // Filter unique images to add
  // const uniqueImagesToAdd = galleryImages?.filter((newImage) => {
  //   return !product.galleryImages.some(
  //     (existingImage) =>
  //       existingImage.url === newImage.url &&
  //       existingImage.alt === newImage.alt,
  //   );
  // });

  // if (uniqueImagesToAdd?.length > 0) {
  //   // Add unique images to galleryImages
  //   await Product.findByIdAndUpdate(
  //     productId,
  //     { $addToSet: { galleryImages: { $each: uniqueImagesToAdd } } },
  //     {
  //       new: true,
  //       runValidators: true,
  //     },
  //   );
  // }

  // Update other fields
  return Product.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteSingle = async (productId: string) => {
  const product = await Product.getProductByProperty("_id", productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return Product.findByIdAndUpdate(
    productId,
    { isDeleted: true },
    { new: true },
  );
};

export const productService = {
  getAll,
  create,
  getSingle,
  update,
  deleteSingle,
};
