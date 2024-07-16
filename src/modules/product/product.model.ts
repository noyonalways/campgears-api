import httpStatus from "http-status";
import { Schema, isValidObjectId, model } from "mongoose";
import slugify from "slugify";
import { uid } from "uid";
import AppError from "../../errors/AppError";
import { ProductStatus } from "./product.constant";
import { IProduct, IProductModel } from "./product.interface";

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

const productSchema = new Schema<IProduct, IProductModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    slug: {
      type: String,
      unique: true,
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
  },
  {
    timestamps: true,
  },
);

productSchema.pre("find", function (this, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("findOne", function (this, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("findOneAndUpdate", function (this, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("save", async function (next) {
  const time = new Date().getTime();
  let slug = slugify(`${this.name}-${time}`, { lower: true });

  // Ensure the slug is unique
  const existingProduct = await Product.findOne({ slug });
  if (existingProduct) {
    const uniqueSuffix = uid(8);
    slug = slugify(`${this.name}-${time}-${uniqueSuffix}`, { lower: true });
  }

  this.slug = slug;
  next();
});

// modify the stock status based on the stock quantity while updating a product
productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update && typeof update === "object") {
    if ("stockQuantity" in update) {
      if (update.status === "in-stock" || update.status === "out-of-stock") {
        update.status = update.stockQuantity > 0 ? "in-stock" : "out-of-stock";
      }
    }
  }
  next();
});

productSchema.statics.getProductByProperty = async function (
  property: string,
  value: string,
) {
  if (property === "_id") {
    if (!isValidObjectId(value)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid ObjectId");
    }
    return this.findById(value);
  }
  return this.findOne({ [property]: value });
};

const Product = model<IProduct, IProductModel>("Product", productSchema);
export default Product;
