import { CartItem } from '@/hooks/useCart';
import { Product } from '@/types/Product';
import toast from 'react-hot-toast';

// unauth users
const addToGuestCart = (
  product: Product,
  updateGuestCart: (items: CartItem[]) => void,
  itemCount?: number
) => {
  const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = existingCart.find((item) => item.product_id === product.id);

  if (existingItem) {
    existingItem.quantity += itemCount ?? 1;
  } else {
    existingCart.push({
      id: crypto.randomUUID(),
      product_id: product.id,
      quantity: itemCount ?? 1,
    });
  }

  updateGuestCart(existingCart);
  toast.success(`${product.title} added to cart!`);
};

const removeFromGuestCart = (
  product: Product,
  updateGuestCart: (items: CartItem[]) => void,
  itemCount?: number
) => {
  const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = existingCart.find((item) => item.product_id === product.id);

  if (existingItem && existingItem.quantity != 1) {
    existingItem.quantity -= 1;
  }

  updateGuestCart(existingCart);
  toast.success(`${itemCount ?? 1} ${product.title} removed from cart!`);
};

const clearGuestItem = (product: Product, updateGuestCart: (items: CartItem[]) => void) => {
  const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = existingCart.filter((item) => item.product_id !== product.id);

  updateGuestCart(updatedCart);
  toast.success(`Successfully removed ${product.title} from cart!`);
};

export { addToGuestCart, removeFromGuestCart, clearGuestItem };
