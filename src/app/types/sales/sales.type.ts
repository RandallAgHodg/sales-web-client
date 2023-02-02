import { User } from '../users/user.type';
import { Product } from '../products/product.type';

export type Sale = {
  id: string;
  createdAt: Date;
  total: number;
  userId: string;
  user: User;
  detail: SaleDetail[];
};

export type SaleDetail = {
  id: string;
  amount: number;
  subtotal: number;
  product: Product;
  saleId: string;
};

export type CreateSaleRequest = {
  total: number;
  detail: CreateSaleDetailRequest[];
};

export type CreateSaleDetailRequest = {
  amount: number;
  subtotal: number;
  productId: string;
};
