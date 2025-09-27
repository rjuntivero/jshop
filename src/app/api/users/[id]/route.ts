import { NextResponse } from 'next/server';
import { users } from '../../_data/users';

interface Props {
  id: string;
}

// fetch a user in mock database
export async function GET(req: Request, { params }: { params: Promise<Props> }) {
  const { id } = await params;

  console.log('LIST OF ALL USERS: ', users);

  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ message: 'User Not Found', status: 404 });
  }
}
