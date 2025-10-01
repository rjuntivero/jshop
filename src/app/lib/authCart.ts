import { Product } from '@/types/Product';
import { User } from 'firebase/auth';
import { doc, increment, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '../firebaseConfig';

// auth users
const addToCart = async (product: Product, user: User, itemCount?: number) => {
  // only authenticated users may add to cart
  if (!user) {
    return;
  }

  const cartItemRef = doc(db, 'carts', user?.uid as string, 'cartItems', product.id.toString());

  try {
    // increment quantity
    await setDoc(
      cartItemRef,
      { product_id: product.id, quantity: increment(itemCount ?? 1) },
      { merge: true }
    );
    toast.success(`${product.title} added to cart!`);
  } catch (err) {
    console.error('Failed to Add Cart Item', err);
    toast.error('Failed to add item to cart. Please try again');
    return false;
  }
  return true;
};

const removeFromCart = async (product: Product, user: User, itemCount: number) => {
  // only authenticated users may add to cart
  if (!user) {
    return;
  }

  const cartItemRef = doc(db, 'carts', user?.uid as string, 'cartItems', product.id.toString());

  try {
    // increment quantity
    await setDoc(
      cartItemRef,
      { product_id: product.id, quantity: increment(itemCount) },
      { merge: true }
    );
    toast.success(`${product.title} added to cart!`);
  } catch (err) {
    console.error('Failed to Add Cart Item', err);
    toast.error('Failed to add item to cart. Please try again');
    return false;
  }
  return true;
};

export { addToCart, removeFromCart };
