import { model, Schema } from "mongoose";
import { ICategory, ISubCategory } from "./category.interface";

// Category Schema
const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

// SubCategory Schema
const SubCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true },
);

// Models
export const Category = model<ICategory>("Category", CategorySchema);
export const SubCategory = model<ISubCategory>(
  "SubCategory",
  SubCategorySchema,
);
