import Link from 'next/link';
import PaginatedGrid from '@/components/layouts/PaginateGrid';
import { Product } from '@/types/Product';
import Image from 'next/image';

export default async function Homepage() {
  const res = await fetch('https://dummyjson.com/products?limit=194', {
    cache: 'no-store',
  });

  const { products }: { products: Product[] } = await res.json();
  const topRatedProducts = products.sort((a, b) => b.rating - a.rating).slice(0, 24);
  const lowStock = products
    .filter((product) => product.availabilityStatus === 'Low Stock')
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 24);
  const luxuryProducts = products
    .filter((product) => product.price > 1000)
    .sort((a, b) => b.price - a.price)
    .slice(0, 24);

  return (
    <>
      <main className="mb-12 bg-background-light relative">
        <section className=" def-margin z-10 flex justify-around gap-5 p-5 text-center">
          <div className="w-full text-primary-light relative z-2 flex h-80 flex-col items-center justify-center">
            <h1 className="font-bold font-sans -motion-translate-y-in-25 motion-preset-focus-md relative z-10 text-[clamp(3.5rem,4vw,5.5rem)] transition-all delay-300 duration-1200 ease-in-out leading-25">
              JSHOP
            </h1>
            <div className="text-secondary-light relative flex flex-col items-center gap-4 font-bold transition-all duration-800 ">
              <p className="text-primary-light motion-preset-slide-left relative z-10 transition-all delay-1200 duration-1000">
                Find what {"you're"} looking for.
              </p>
              <Link
                href="products"
                className="motion-preset-expand bg-primary-light hover:bg-secondary-light hover:text-primary-light relative z-10 rounded-full px-4 py-2 transition-all duration-400 ease-out">
                Shop Now
              </Link>
            </div>
            <div className="absolute inset-0 -translate-x-90  w-full lg:flex hidden">
              <Image src="./favoriteitem.svg" fill alt="shopping_icon" />
            </div>
            <div className="absolute inset-0 translate-x-75  w-full lg:flex hidden">
              <Image src="./shoppingspree.svg" fill alt="shopping_icon" />
            </div>
          </div>
        </section>

        {/* Item Categories */}
        <PaginatedGrid items={topRatedProducts} title="Top Rated" />
        {/* Low Stock */}
        <PaginatedGrid items={lowStock} title="Grab Fast" />
        {/* High Price */}
        <PaginatedGrid items={luxuryProducts} title="Luxury Picks" />
      </main>
    </>
  );
}
