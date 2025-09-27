'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useFetchProduct } from '@/hooks/useFetchProduct';
import Navbar from '@/components/layouts/Navbar';
import LoadWheel from '@/components/ui/LoadWheel';
import Button from '@/components/ui/Button';
import CartIcon from '@/components/icons/CartIcon';
import CartSidebar from '@/components/layouts/CartSidebar';
import Footer from '@/components/layouts/Footer';
import { Product } from '@/types/Product';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { addToCart, toggleCart } from '@/features/cartSlice';
import { useAppSelector } from '@/state/hooks';
import Image from 'next/image';
import ProductPreview from '@/components/ui/ProductPreview';
import ItemCounter from '@/components/ui/ItemCounter';
import { useItemCount } from '@/hooks/useItemCount';
import toast from 'react-hot-toast';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import StarRating from '@/components/ui/StarRating';
import Review from '@/components/ui/Review';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useFetchProduct(Number(id));
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const dispatch = useDispatch();
  const { itemCount, updateItemCount } = useItemCount();
  const { data: products } = useFetchProducts();

  const relatedProducts: Product[] | undefined = products?.filter(
    (item) => item.category === product?.category && item.id != product.id
  );

  const similarProducts: Product[] | undefined = products?.filter(
    (item) => item.id !== product?.id && product?.tags?.some((tag) => item.tags?.includes(tag))
  );
  const handleCartToggle = () => {
    dispatch(toggleCart());
  };

  const handleAddToCart = (product: Product) => {
    const payload: Product = {
      ...product,
      count: itemCount,
    };
    dispatch(addToCart(payload));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar productsPage={true} />

      <CartSidebar
        onClose={handleCartToggle}
        className={`bg-background-light fixed top-0 right-0 z-99999 flex h-dvh w-93 md:w-106 flex-col outline-1 transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      />
      {isLoading && (
        <div className="flex h-[600px] items-center justify-center">
          <LoadWheel />
        </div>
      )}
      {error && <ErrorMessage />}

      {product && (
        <main className=" py-12 bg-white grow text-primary-light relative flex w-full flex-col justify-center transition-all duration-400 px-[clamp(0px,2%,50px)] ">
          {/* background design */}
          {/* <div className="bg-secondary-light/70 absolute -bottom-12 left-30 z-1 hidden h-[128px] w-[128px] rounded-full p-42 md:block"></div>
          <div className="bg-secondary-light/70 absolute left-20 z-1 hidden rounded-full p-8 md:block"></div>
          <div className="bg-secondary-light/70 absolute bottom-68 left-38 z-1 hidden rounded-full p-3 md:block"></div>
          <div className="bg-secondary-light/70 absolute -top-12 right-30 z-1 hidden h-[128px] w-[128px] rounded-full p-42 md:block"></div>
          <div className="bg-secondary-light/70 absolute right-30 bottom-60 z-1 hidden rounded-full p-3 md:block"></div>
          <div className="bg-secondary-light/70 absolute right-35 bottom-40 z-1 hidden rounded-full p-8 md:block"></div> */}

          <article className="justify-center z-3 box-border flex w-full flex-col md:items-center gap-8 md:p-1 p-0 md:flex-row ">
            <div className="md:px-6">
              {/* image container */}
              <div className="motion-preset-blur-down-md relative w-full aspect-square mx-auto p-4 bg-white flex rounded-sm shadow-md outline-1 outline-primary-dark">
                <Image
                  src={product.thumbnail!}
                  alt="PRODUCT IMAGE"
                  width={500}
                  height={500}
                  className="max-w-[500px] mx-auto  object-contain object-center transition-all duration-700 group-hover:scale-102"
                  priority
                />
              </div>
            </div>
            <section className="flex flex-col gap-3 max-w-[500px] motion-preset-blur-down-md">
              <header className="w-full flex flex-col gap-3">
                <h1 className="font-sub-header font-bold text-5xl">{product?.title}</h1>
                <h2 className="text-secondary-light text-2xl">{product?.category}</h2>
                <div className="flex items-center gap-2">
                  <p>{product?.rating || 0}</p>
                  <StarRating rating={product?.rating || 0} />
                  <p className="text-gray-400">{product?.reviews?.length} reviews</p>
                </div>
                <p className="italic text-gray-400">{product?.stock} left in stock</p>
              </header>
              <hr />
              <p className="py-4 text-[clamp(0.9em,1vw,2em)]">{product?.description}</p>
              <p>
                tags: <span className="text-secondary-light">{product?.tags?.join(', ')}</span>
              </p>
              <div className="flex flex-col items-start justify-start gap-3">
                <h1 className="text-3xl font-bold">{`$${product?.price}`}</h1>
                <div className="flex gap-3 md:flex-row flex-col w-full">
                  <ItemCounter updateItemCount={updateItemCount} itemCount={itemCount} />
                  <Button
                    className="w-full bg-secondary-light border-primary-light flex items-center justify-center p-3 gap-3"
                    onClick={() => handleAddToCart(product as Product)}>
                    <h1 className="font-sub-header">Add To Cart</h1>
                    <CartIcon width={28} height={28} color="#442727" />
                  </Button>
                </div>
              </div>
              <Link className="" href="/products">
                <h1 className="font-sub-header hover:text-secondary-light cursor-pointer text-end text-sm">
                  Back to Products...
                </h1>
              </Link>
            </section>
          </article>
        </main>
      )}
      {/* related products */}
      <section className="p-8 border-t-1   flex flex-col gap-4">
        <h1 className="font-semibold text-2xl text-primary-light ">
          Related Products: {`"${product?.category}"`}
        </h1>
        <div className="gap-4 flex  overflow-x-auto pb-2">
          {relatedProducts?.map((product) => (
            <div key={`${product.id}-related`} className="shrink-0 w-64">
              <ProductPreview product={product} />
            </div>
          ))}
        </div>
      </section>

      {similarProducts && similarProducts?.length > 0 && (
        <section className="p-8 border-t-1 border-b-1   flex flex-col gap-4">
          <h1 className="font-semibold text-2xl text-primary-light ">Similar Items:</h1>
          <div className="gap-4 flex  overflow-x-auto pb-2">
            {similarProducts?.map((product) => (
              <div key={`${product.id}-similar`} className="shrink-0 w-64">
                <ProductPreview product={product} />
              </div>
            ))}
          </div>
        </section>
      )}
      {/* reviews */}
      <section className="p-8 flex flex-col gap-4">
        <h1 className="font-semibold text-2xl text-primary-light ">Reviews:</h1>
        <div className="gap-4 flex flex-col grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {product?.reviews?.map((review, i) => (
            <Review key={`${review.reviewerEmail}-${i}`} review={review} />
          ))}
        </div>
      </section>
      <section>
        <div className="bg-primary-light mb-1 w-full pt-1"></div>
        <Footer />
      </section>
    </div>
  );
};

export default ProductPage;
