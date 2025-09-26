import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/Product';

const fetchProducts = async (category: string): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const url =
    category === 'All'
      ? 'https://dummyjson.com/products?limit=194'
      : `https://dummyjson.com/products/category/${category}`;
  const response = await fetch(url);
  const { products }: { products: Product[] } = await response.json();

  const productsWithTotalPrice = products.map((product) => ({
    ...product,
    totalPrice: product.price,
  }));

  return productsWithTotalPrice;
};

export const useFetchProducts = (category: string = 'All') => {
  return useQuery<Product[], Error>({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
  });
};
