import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/app/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Product } from '@/types/Product';

interface CartItem {
  product_id: string;
  quantity: number;
}

// 1️⃣ Fetch cart items from Firestore
const fetchUserCartItems = async (userId: string): Promise<CartItem[]> => {
  const cartSnapshot = await getDocs(collection(db, 'carts', userId, 'cartItems'));
  return cartSnapshot.docs.map((doc) => ({
    product_id: doc.id,
    quantity: doc.data().quantity,
  }));
};

// 2️⃣ Fetch a single product from dummyjson
const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
};

export const useCart = (): { cart: Product[]; isLoading: boolean } => {
  const [user] = useAuthState(auth);

  const { data: cartItems = [], isLoading: isCartLoading } = useQuery<CartItem[], Error>({
    queryKey: ['cartItems', user?.uid],
    queryFn: () => (user ? fetchUserCartItems(user.uid) : []),
    enabled: !!user,
  });

  const cartItemIds = cartItems.map((item) => item.product_id);

  const { data: products = [], isLoading: isProductsLoading } = useQuery<Product[], Error>({
    queryKey: ['cartProducts', cartItemIds],
    queryFn: async () => {
      const products = await Promise.all(
        cartItems.map(async (item) => {
          const product = await fetchProductById(item.product_id);
          return { ...product, quantity: item.quantity };
        })
      );
      return products;
    },
    enabled: cartItems.length > 0,
  });

  return { cart: products, isLoading: isCartLoading || isProductsLoading };
};
