import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in with Email',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        if (credentials === null) return null;
        try {

          return null;
        } catch (e) {
          console.log(e);
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      // @ts-ignore
      session.id = token.id;
      // @ts-ignore
      session.user?.email = token.email;
      // @ts-ignore
      session.jwt = token.jwt;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        // @ts-ignore
        token.jwt = user.jwt;
        token.email = user.email;
      }
      return Promise.resolve(token);
    },
  },
};