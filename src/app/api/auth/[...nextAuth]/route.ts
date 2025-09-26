// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { users } from '@/app/api/_data/users';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = users.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password
        );
        if (user) {
          // strip password before returning
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
