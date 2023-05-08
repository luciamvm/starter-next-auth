import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const root = process.env.ROOT_URL;

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

        const res = await fetch(`http://${root}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        if (res.status === 401) {
          return null;
        } else {
          return { id: '1', email: email };
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
