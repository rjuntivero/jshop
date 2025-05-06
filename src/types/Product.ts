export interface HomepageProps {
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
  count: number;
  price: number;
  totalPrice: number;
  description: string;
}
