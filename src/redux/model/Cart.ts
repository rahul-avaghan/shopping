import { Product } from './Product';

export interface Cart {
  products: CartProductDetails[];
  totalCredits: number;
}

export interface CartProductDetails {
  quantity: number;
  lineCredits: number;
  product: Product;
}
