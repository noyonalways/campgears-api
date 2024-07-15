import { IProduct } from "./product.interface";
import Product from "./product.model";

const getAll = async () => {
  return Product.find();
};

const create = (product: IProduct) => {
  return Product.create(product);
};

const getProductByProperty = (property: string, value: string) => {
  return Product.getProductByProperty(property, value);
};

export const productService = { getAll, create, getProductByProperty };
