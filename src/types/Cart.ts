import { Product } from './Product';

export type Cart = {
  items: Product[];
  totalPrice: number;
};
