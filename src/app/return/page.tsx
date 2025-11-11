// app/return/page.tsx
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import SummaryItem from '@/components/ui/SummaryItem';
import { stripe } from '@/app/lib/stripe';
import Link from 'next/link';
import { Product } from '@/types/Product';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface ReceiptItem {
  id: string;
  quantity: number;
  totalPrice?: number;
}

// Fetch full product data
async function fetchProductsData(items: ReceiptItem[]): Promise<Product[]> {
  const products = await Promise.all(
    items.map(async (item) => {
      const res = await fetch(`https://dummyjson.com/products/${item.id}`);
      const product: Product = await res.json();
      return { ...product, quantity: item.quantity, totalPrice: item.quantity * product.price };
    })
  );
  return products;
}

interface Props {
  searchParams: { session_id?: string | undefined };
}

export default async function CheckoutReturn({ searchParams }: Props) {
  const { session_id } = await searchParams;
  if (!session_id) {
    return (
      <>
        <Navbar />
        <main className="flex justify-center items-center h-screen text-primary-light">
          <p>Session ID missing.</p>
        </main>
        <Footer />
      </>
    );
  }

  // Fetch Stripe session & line items **server-side**
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const cartData = session.metadata?.cart ? JSON.parse(session.metadata.cart) : [];
  const products = await fetchProductsData(cartData);
  console.log('products in return page:', products);

  const paid = session.payment_status === 'paid';
  const totalItems = products.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = products.reduce((sum, item) => sum + item.totalPrice, 0);

  const customerId =
    typeof session.customer === 'string' ? session.customer : (session.customer?.id ?? null);

  return (
    <>
      <Navbar />
      <main className="text-primary-light md:p-6 min-h-screen">
        <article className="p-12 flex flex-col items-center gap-6">
          <div className="max-w-[55ch] flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 p-4 bg-primary-light rounded-full text-secondary-light flex items-center justify-center text-3xl">
              {paid ? '✔' : '❌'}
            </div>
            <h1 className="text-4xl font-semibold pt-3">
              {paid ? 'Thank You For Your Purchase' : 'Payment Failed'}
            </h1>
            {paid && customerId && (
              <p className="text-center text-lg">Your Stripe Customer ID: {customerId}</p>
            )}
          </div>

          {paid && products.length > 0 && (
            <div className="flex flex-col bg-secondary-dark p-8 max-w-[1200px] min-w-[900px] outline-1 rounded-sm outline-secondary-light/40">
              <h1 className="text-2xl font-bold">Order Summary</h1>
              <div className="relative flex flex-col overflow-y-auto max-h-[400px] mb-4">
                {products.map((product) => (
                  <SummaryItem
                    key={product.id}
                    product={product}
                    totalPrice={product.totalPrice}
                    quantity={product.quantity}
                  />
                ))}
              </div>
              <hr />
              <div className="pt-4 flex justify-between gap-2 text-[clamp(0.2rem,2vw,1.3rem)] text-end items-end">
                <h2>Total</h2>
                <div className="justify-self-end flex gap-2">
                  <p>
                    <strong>${totalAmount.toFixed(2)}</strong>
                  </p>
                  <p>{`(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}</p>
                </div>
              </div>
            </div>
          )}

          <Link
            href="/"
            className="py-3 px-4 bg-primary-light text-secondary-light font-semibold rounded-full">
            Back to Home
          </Link>
        </article>
      </main>
      <div className="bg-primary-light mb-1 w-full pt-1"></div>
      <Footer />
    </>
  );
}
