import ProductGrid from '@/components/layouts/ProductGrid';
import { Product } from '@/types/Product';

const fetchProducts = async () => {
  const res = await fetch('https://dummyjson.com/products?limit=194', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const { products }: { products: Product[] } = await res.json();
  console.log(products);
  return products;
};

export default async function Page() {
  const products = await fetchProducts();

  return <ProductGrid products={products} />;
}
