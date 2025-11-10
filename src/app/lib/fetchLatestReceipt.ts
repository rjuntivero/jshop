import { collection, query, limit, getDocs, where } from 'firebase/firestore';
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

export const fetchLatestReceipt = async (
  userId: string,
  paymentIntentId: string
): Promise<LatestReceipt> => {
  const receiptsRef = collection(db, 'receipts');
  const q = query(
    receiptsRef,
    where('userId', '==', userId),
    where('receiptId', '==', paymentIntentId),
    limit(1)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) return { items: [], orderNumber: '' };

  const latestReceipt = snapshot.docs[0].data();

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
