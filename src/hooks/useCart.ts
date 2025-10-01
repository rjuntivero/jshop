import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/app/firebaseConfig';
import { User } from 'firebase/auth';
import { Product } from '@/types/Product';

export interface CartItem {
  id: string;
  product_id: number;
  quantity: number;
}

export interface CartProduct extends Product {
  quantity: number;
}

const useCart = (user: User | null): [CartProduct[], boolean, (items: CartItem[]) => void] => {
  console.log('USE CART RUNNING--------------------------');
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // reactive guest cart
  const [guestCart, setGuestCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    }
    return [];
  });

  const fetchProducts = async (items: CartItem[]) => {
    const products = await Promise.all(
      items.map(async (item) => {
        const res = await fetch(`https://dummyjson.com/products/${item.product_id}`);
        const product: Product = await res.json();
        return { ...product, quantity: item.quantity };
      })
    );
    console.log('FETCHED PRODUCTS CAUSE FUNCTION ', products);
    setCart(products);
    setLoading(false);
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (user) {
      // auth users
      const cartItemsRef = collection(db, 'carts', user.uid, 'cartItems');
      unsubscribe = onSnapshot(cartItemsRef, async (snapshot) => {
        const items: CartItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<CartItem, 'id'>),
        }));
        console.log('FETCHING FOR AUTH USERS');
        await fetchProducts(items);
      });
    } else {
      // guest users
      const localItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
      console.log('FETCHING FOR GUEST USERS');
      setGuestCart(localItems);
      fetchProducts(localItems);
    }

    console.log('FETCHED PRODUCTS FOR USE EFFECT 1');
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(guestCart));
      fetchProducts(guestCart);
    }
    console.log('FETCHING GUEST CART', guestCart);
  }, [guestCart, user]);

  const updateGuestCart = (items: CartItem[]) => {
    setGuestCart(items);
  };

  return [cart, loading, updateGuestCart];
};

export default useCart;
