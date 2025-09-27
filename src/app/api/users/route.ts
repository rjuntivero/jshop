import { NextResponse } from 'next/server';
import { users } from '../_data/users';

// fetch all users
export async function GET() {
  return NextResponse.json(users);
}

// create a new user in mock database
export async function POST(req: Request) {
  const newUser = await req.json();
  users.push(newUser);
  console.log(' USER CREATED SSUCCCESSFULLYY: ', newUser);
  return NextResponse.json(newUser);
}
