import { Product } from '@/types/Product';
import { Cart } from '@/types/Cart';

const cart: Cart = {
  items: [],
  totalPrice: 0,
  isCartOpen: false,
  isDirectoryOpen: false,
};

export async function GET() {
  return Response.json(cart);
}

export async function POST(req: Request) {
  const product: Product & { count?: number } = await req.json();

  const quantityToAdd = product.count && product.count > 0 ? product.count : 1;
  const existingItem = cart.items.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.count! += quantityToAdd;
    existingItem.totalPrice = existingItem.price * existingItem.count!;
  } else {
    const itemToPush = {
      ...product,
      count: quantityToAdd,
      totalPrice: product.price * quantityToAdd,
    };
    cart.items.push(itemToPush);
  }

  // update total price
  cart.totalPrice = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

  return Response.json(cart);
}

export async function DELETE() {
  cart.items = [];
  cart.totalPrice = 0;
  return Response.json(cart);
}
