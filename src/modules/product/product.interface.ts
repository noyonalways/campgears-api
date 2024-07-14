export type TProductStatus = "in-stock" | "out-of-stock" | "discontinued";

export type TGalleryImage = {
  id: string;
  url: string;
  alt: string;
};

export type TProduct = {
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
  galleryImages: TGalleryImage[];
};
