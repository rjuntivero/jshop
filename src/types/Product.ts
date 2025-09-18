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
  rating: {
    rate: number;
    count: number;
  };
  totalPrice: number;
  description: string;
}
