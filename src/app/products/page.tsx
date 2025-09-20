import ProductGrid from '@/components/layouts/ProductGrid';

const fetchProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const products = await res.json();

  return products;
};

export default async function Page() {
  const products = await fetchProducts();

  return <ProductGrid products={products} />;
}
