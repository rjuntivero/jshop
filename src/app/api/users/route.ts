import { users } from '../_data/users';

export async function GET() {
  return Response.json(users);
}

export async function POST(req: Request) {
  const newUser = await req.json();
  newUser.id = users.length + 1;
  newUser.cart = [];
  users.push(newUser);
  return Response.json(newUser);
}
