import { useQuery } from '@tanstack/react-query'
import { Product } from '../types/Product'

const fetchProducts = async (category: string): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  const url =
    category === 'All'
      ? 'https://fakestoreapi.com/products'
      : `https://fakestoreapi.com/products/category/${category}`
  const response = await fetch(url)
  return response.json()
}

export const useFetchProducts = (category: string = 'All') => {
  return useQuery<Product[], Error>({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
  })
}
