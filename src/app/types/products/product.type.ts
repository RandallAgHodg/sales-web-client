export type Product = {
  id: string;
  name: string;
  stock: number;
  price: number;
  isAvailable: boolean;
  createdAt: Date;
};

export type SearchProductRequest = {
  isAvailable?: boolean;
  name: string;
};

export type CreateProductRequest = {
  name: string;
  price: number;
  stock: number;
};

export type UpdateProductRequest = CreateProductRequest & {
  id: string;
  isAvailable: boolean;
};
