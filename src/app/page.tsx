import Link from 'next/link';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import DirectoryToggle from '@/components/client/DirectoryToggle';
import ProductPreview from '@/components/ui/ProductPreview';
import { Product } from '@/types/Product';

export default async function Homepage() {
  const res = await fetch('https://fakestoreapi.com/products', {
    cache: 'no-store',
  });
  const products: Product[] = await res.json();
  return (
    <>
      <Navbar className="border-b-bg-primary-light flex items-center justify-between transition-all">
        <DirectoryToggle />
      </Navbar>
      <main>
        <section className="def-margin z-10 flex justify-around gap-5 p-5">
          <div className="text-primary-light relative z-2 flex h-80 flex-col items-center justify-center">
            <h1 className="font-big-header -motion-translate-y-in-25 motion-preset-focus-md relative z-10 text-[clamp(2rem,15vw,4.5rem)] transition-all delay-300 duration-1200 ease-in-out">JSHOP</h1>
            <div className="text-secondary-light relative flex flex-col items-center gap-4 font-bold transition-all duration-800">
              <p className="text-primary-light motion-preset-slide-left relative z-10 transition-all delay-1200 duration-1000">All the right styles for you</p>
              <div className="bg-secondary-light/50 motion-opacity-loop-70 absolute -top-40 -left-50 z-0 hidden h-60 w-60 rounded-full transition-all delay-400 duration-3500 ease-in-out md:block"></div>
              <div className="bg-primary-light/50 motion-opacity-loop-50 absolute -top-20 -right-40 z-0 hidden h-40 w-40 rounded-full transition-all delay-2000 duration-3500 ease-in-out md:block"></div>
              <div className="bg-secondary-light/30 motion-opacity-loop-60 absolute top-10 left-20 z-0 hidden h-20 w-20 rounded-full transition-all delay-1000 duration-3500 ease-in-out md:block"></div>
              <div className="bg-primary-light motion-opacity-loop-40 absolute top-10 -left-18 z-0 hidden h-15 w-15 rounded-full transition-all delay-2500 duration-3500 ease-in-out md:block"></div>
              <div className="bg-primary-light motion-opacity-loop-20 absolute top-25 -left-20 z-0 hidden h-5 w-5 rounded-full transition-all delay-1100 duration-4500 ease-in-out md:block"></div>
              <Link href="products" className="motion-preset-expand bg-primary-light hover:bg-secondary-light hover:text-primary-light relative z-10 rounded-full px-4 py-2 transition-all duration-400 ease-out">
                Shop Now
              </Link>
            </div>
          </div>
        </section>
        <section className="def-margin">
          <h2 className="font-bold">New Arrivals</h2>
          <article className="bg-secondary-light/50 outline-primary-light mt-3 box-border flex h-auto gap-4 overflow-auto rounded-sm p-2 outline-2 md:p-5">
            {products?.slice(0, 8)?.map((product) => (
              <article className="w-full flex-none sm:w-1/2 md:w-1/3 lg:w-1/4" key={String(product.id)}>
                <ProductPreview key={String(product.id)} product={product} productName={product.title} imageURL={product.image} productPrice={product.price} />
              </article>
            ))}
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
