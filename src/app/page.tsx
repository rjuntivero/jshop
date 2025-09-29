import Link from 'next/link';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import { Product } from '@/types/Product';
import Image from 'next/image';
import PaginatedGrid from '@/components/layouts/PaginateGrid';

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
      <Navbar homePage={true} />
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
              {/* background deco */}
              <div className="bg-secondary-light/50 motion-opacity-loop-70 absolute -top-40 -left-50 z-0 hidden h-60 w-60 rounded-full transition-all delay-400 duration-3500 ease-in-out md:block"></div>
              <div className="bg-primary-light/50 motion-opacity-loop-50 absolute -top-20 -right-40 z-0 hidden h-40 w-40 rounded-full transition-all delay-2000 duration-3500 ease-in-out md:block"></div>
              <div className="bg-secondary-light/30 motion-opacity-loop-60 absolute top-10 left-20 z-0 hidden h-20 w-20 rounded-full transition-all delay-1000 duration-3500 ease-in-out md:block"></div>
              <div className="bg-primary-light motion-opacity-loop-40 absolute top-10 -left-18 z-0 hidden h-15 w-15 rounded-full transition-all delay-2500 duration-3500 ease-in-out md:block"></div>
              <div className="bg-primary-light motion-opacity-loop-20 absolute top-25 -left-20 z-0 hidden h-5 w-5 rounded-full transition-all delay-1100 duration-4500 ease-in-out md:block"></div>
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
      <div className="bg-primary-light mb-1 w-full pt-1"></div>

      <Footer />
    </>
  );
}
