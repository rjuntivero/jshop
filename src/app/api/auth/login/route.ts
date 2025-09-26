import { users } from '../../_data/users';

export async function POST(req: Request) {
  const user = await req.json();
  const userExists = users.find((existinguser) => existinguser.email === user.email);
  if (userExists) {
    return Response.json(user);
  } else {
    return Response.json('User Not Found');
  }
}
