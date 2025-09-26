import { users } from '../../_data/users';
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = await params.id;

  const user = users.find((user) => user.id === parseInt(id));

  return Response.json(user);
}
