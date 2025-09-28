'use client';

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductPreview from '@/components/ui/ProductPreview';
import { Product } from '@/types/Product';

interface Props {
  items: Product[];
  title?: string;
  itemsPerPage?: number;
}

export default function PaginatedGrid({ items, title, itemsPerPage = 6 }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const currentItems = items.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section className="def-margin">
      {title && <h2 className="font-bold text-xl text-primary-light mb-3">{title}</h2>}

      <div className="outline-3 bg-secondary-dark outline-secondary-light/20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {currentItems.map((item) => (
          <ProductPreview key={item.id} product={item} />
        ))}
      </div>

      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center gap-2 mt-4 items-center text-primary-light"
        pageLinkClassName="px-3 py-1 border rounded hover:bg-primary-light hover:text-white transition-all cursor-pointer"
        activeLinkClassName="bg-primary-light text-white"
        previousLabel="<"
        nextLabel=">"
        previousLinkClassName="px-3 py-1 border rounded bg-secondary-light hover:brightness-90 transition-all cursor-pointer"
        nextLinkClassName="px-3 py-1 border rounded bg-secondary-light hover:brightness-90 transition-all cursor-pointer"
      />
    </section>
  );
}
