import { Document, Model } from "mongoose";

export type TProductStatus = "in-stock" | "out-of-stock" | "discontinued";

export interface IGalleryImage {
  url: string;
  alt: string;
}

export interface IProduct {
  slug: string;
  name: string;
  description: string;
  stockQuantity: number;
  status: TProductStatus;
  price: number;
  color: string;
  category: string;
  subCategory: string;
  brand: string;
  tags: string[];
  image: string;
  isFeatured: boolean;
  isDeleted: boolean;
  galleryImages: IGalleryImage[];
}

export interface IProductModel extends Model<IProduct> {
  getProductByProperty: (
    property: string,
    value: string,
  ) => Promise<(IProduct & Document) | null>;
}
