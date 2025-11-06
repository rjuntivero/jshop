import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import { Product } from '@/types/Product';

interface ReceiptItem {
  id: number;
  quantity: number;
}

export interface LatestReceipt {
  items: ReceiptItem[];
  orderNumber: string;
}

export const fetchLatestReceipt = async (userId: string): Promise<LatestReceipt> => {
  const receiptsRef = collection(db, 'receipts');
  const q = query(
    receiptsRef,
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(1)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) return { items: [], orderNumber: '' };

  const latestReceipt = snapshot.docs[0].data();

  console.log('LATEST RECEIPT:', latestReceipt);
  return { items: latestReceipt.items || [], orderNumber: latestReceipt.orderNumber || '' };
};

export const fetchProductsData = async (items: ReceiptItem[]) => {
  const products = await Promise.all(
    items.map(async (item) => {
      const res = await fetch(`https://dummyjson.com/products/${item.id}`);
      const product: Product = await res.json();
      return { ...product, quantity: item.quantity, totalPrice: item.quantity * product.price };
    })
  );
  return products;
};
