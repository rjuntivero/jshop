import { NextResponse } from 'next/server';
import { users } from '../../_data/users';

export async function POST(req: Request) {
  const user = await req.json();
  const userExists = users.find((existinguser) => existinguser.email === user.email);
  if (userExists) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json('User Not Found');
  }
}
