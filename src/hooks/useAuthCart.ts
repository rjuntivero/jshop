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

const useAuthCart = (user: User | null): [CartProduct[], boolean] => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (items: CartItem[]) => {
    const products = await Promise.all(
      items.map(async (item) => {
        const res = await fetch(`https://dummyjson.com/products/${item.product_id}`);
        const product: Product = await res.json();
        return { ...product, quantity: item.quantity };
      })
    );
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
        await fetchProducts(items);
      });
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);
  console.log(cart);

  return [cart, loading];
};

export default useAuthCart;
