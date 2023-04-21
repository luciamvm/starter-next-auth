import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',

      credentials: {},

      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        if (res.status === 401) {
          return null;
        }

        return { id: '123', email: email };

      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
