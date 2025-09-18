import { useMemo } from 'react';
import { Product } from '../types/Product';

export const useFilteredProducts = (products: Product[] | undefined, search: string, activeCategory: string) => {
  console.log('fetched products: ', products);

  return useMemo(() => {
    return products
      ?.filter((product) => {
        if (activeCategory === 'All') return true;
        return product.category.toLowerCase().includes(activeCategory.toLowerCase());
      })
      .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
  }, [products, search, activeCategory]);
};
