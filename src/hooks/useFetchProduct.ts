import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/Product';

const fetchProduct = async (id: number): Promise<Product> => {
  const url = `https://fakestoreapi.com/products/${id}`;
  const response = await fetch(url);
  const product: Product = await response.json();
  const productWithTotalPrice = {
    ...product,
    totalPrice: product.price as number,
  };
  return productWithTotalPrice;
};

export const useFetchProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  });
};
