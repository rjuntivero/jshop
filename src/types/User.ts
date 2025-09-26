import { Cart } from './Cart';

export type User = {
  id: number;
  email: string;
  password: string;
  cart: Cart | [];
};

export type UserState = {
  currentUser: User | null;
  isLoggedIn: boolean;
};
