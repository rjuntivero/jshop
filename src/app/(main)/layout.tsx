'use client';
import React from 'react';
import NavbarMain from '@/components/layouts/NavbarMain';
import Footer from '@/components/layouts/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarMain />
      {children}
      <div className="bg-primary-light mb-1 w-full pt-1" />
      <Footer />
    </>
  );
}
