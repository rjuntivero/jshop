import { runTransaction, doc, deleteDoc } from 'firebase/firestore';
import { Product } from '@/types/Product';
import { User } from 'firebase/auth';
import { db } from '../firebaseConfig';
import toast from 'react-hot-toast';

const addToAuthCart = async (product: Product, user: User, itemCount = 1) => {
  if (!user) return;

  const cartItemRef = doc(db, 'carts', user.uid, 'cartItems', product.id.toString());

  try {
    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(cartItemRef);

      if (snap.exists()) {
        const data = snap.data() as { quantity?: number };
        const currentQty = data?.quantity ?? 0;
        transaction.update(cartItemRef, {
          quantity: currentQty + itemCount,
          product_id: product.id,
        });
      } else {
        transaction.set(cartItemRef, {
          product_id: product.id,
          quantity: itemCount,
        });
      }
    });

    toast.success(`${product.title} added to cart!`);
  } catch (err) {
    console.error('Failed to Add Cart Item', err);
    toast.error('Failed to add item to cart. Please try again');
  }
};

const removeFromAuthCart = async (product: Product, user: User) => {
  if (!user) return;

  const cartItemRef = doc(db, 'carts', user?.uid as string, 'cartItems', product.id.toString());

  try {
    // runTransaction will retry if there's contention and returns the callback's return value
    const canDecrement = await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(cartItemRef);
      if (!snap.exists()) return false;

      const data = snap.data() as { quantity?: number } | undefined;
      const currentQty = (data?.quantity ?? 0) as number;

      if (currentQty > 1) {
        transaction.update(cartItemRef, { quantity: currentQty - 1 });
        return true;
      }

      return false;
    });

    if (canDecrement) {
      toast.success(`${product.title} removed from cart!`);
      return true;
    }
  } catch (err) {
    console.error('Failed to remove Cart Item', err);
    toast.error('Failed to remove item from cart. Please try again');
    return false;
  }
  return true;
};

const clearAuthItem = async (product: Product, user: User) => {
  if (!user) return;

  const cartItemRef = doc(db, 'carts', user.uid, 'cartItems', product.id.toString());

  try {
    await deleteDoc(cartItemRef);
    toast.success(`${product.title} cleared from cart!`);
    return true;
  } catch (err) {
    console.error('Failed to clear Cart Item', err);
    toast.error('Failed to clear item from cart. Please try again');
    return false;
  }
};

export { addToAuthCart, removeFromAuthCart, clearAuthItem };
