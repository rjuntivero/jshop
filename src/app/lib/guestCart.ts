import { Product } from '@/types/Product';
import toast from 'react-hot-toast';

// unauth users
const addToGuestCart = (product: Product, itemCount: number) => {
  const existingCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
  const existingItem = existingCart.find((item: Product) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += itemCount;
  } else {
    existingCart.push({ ...product, quantity: itemCount });
  }

  localStorage.setItem('guestCart', JSON.stringify(existingCart));
  toast.success(`${product.title} added to cart!`);
};

export { addToGuestCart };
