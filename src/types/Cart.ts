import { Product } from './Product';

export type Cart = {
  items: Product[];
  totalPrice: number;
  isCartOpen: boolean;
  isDirectoryOpen: boolean;
};
