export interface HomepageProps {
  products: Product[];
}

export interface Review {
  rating: number;
  comment?: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  count: number;
  rating: number;
  stock: number;
  tags?: string[];
  reviews?: Review[];
  discountPercentage: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  thumbnail: string;
  totalPrice: number;
}
