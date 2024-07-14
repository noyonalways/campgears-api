import { Schema, model } from "mongoose";
import { ProductStatus } from "./product.constant";
import { TProduct } from "./product.interface";

const galleryImageSchema = new Schema({
  url: {
    type: String,
    required: [true, "URL is required"],
  },
  alt: {
    type: String,
    required: [true, "Alt is required"],
  },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  subCategory: {
    type: String,
    required: [true, "Sub Category is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  stockQuantity: {
    type: Number,
    required: [true, "Stock Quantity is required"],
  },
  color: {
    type: String,
    required: [true, "Color is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: {
      values: ProductStatus,
      message: "{VALUE} is not supported",
    },
    default: function () {
      return this.stockQuantity > 0 ? "in-stock" : "out-of-stock";
    },
  },
  tags: {
    type: [String],
    default: [],
  },
  galleryImages: [galleryImageSchema],
});

const Product = model<TProduct>("Product", productSchema);
export default Product;
