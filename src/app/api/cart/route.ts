import { Product } from '@/types/Product';
import { Cart } from '@/types/Cart';
import { NextResponse } from 'next/server';

const cart: Cart = {
  items: [],
  totalPrice: 0,
};

export async function GET() {
  return NextResponse.json(cart);
}

export async function POST(req: Request) {
  const product: Product & { quantity?: number } = await req.json();

  const quantityToAdd = product.quantity && product.quantity > 0 ? product.quantity : 1;
  const existingItem = cart.items.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity! += quantityToAdd;
    existingItem.totalPrice = existingItem.price * existingItem.quantity!;
  } else {
    const itemToPush = {
      ...product,
      quantity: quantityToAdd,
      totalPrice: product.price * quantityToAdd,
    };
    cart.items.push(itemToPush);
  }

  // update total price
  cart.totalPrice = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

  return NextResponse.json(cart);
}

export async function DELETE() {
  cart.items = [];
  cart.totalPrice = 0;
  return NextResponse.json(cart);
}
