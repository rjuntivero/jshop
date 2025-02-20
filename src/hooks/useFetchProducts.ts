import { useQuery } from '@tanstack/react-query'
import { Product } from '../types/Product'

// Fetch function
const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // simulating a delay
  const response = await fetch('https://fakestoreapi.com/products')
  return response.json()
}

// Custom hook to fetch products
export const useFetchProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'], // queryKey should be an array
    queryFn: fetchProducts, // queryFn is the function to fetch data
  })
}
