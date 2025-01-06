import { Document, Types } from "mongoose";

// Category Interface
export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
}

// SubCategory Interface
export interface ISubCategory extends Document {
  name: string;
  description?: string;
  category: Types.ObjectId; // Reference to the parent category
}
