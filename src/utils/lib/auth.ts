import { authService } from '@/src/services/authService';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in with identifier',
      credentials: {
        identifier: { label: 'identifier', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      type: 'credentials',
// @ts-ignore
      async authorize(credentials, req) {
        if (credentials == null) return null;
        try {
          const { user, jwt } = await authService.loginUser({
            identifier: credentials.identifier,
            password: credentials.password,
          });

          if (user) {
            return {
              id: user.id,
              username: user.username,
              email: user.email,
              jwt: jwt,
            };
          } else {
            return null;
          }

        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {

      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = Number(user.id!);
        token.jwt = user.jwt!;
        token.username = user.username;
        token.email = user.email;
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {

      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email!;
      }

      return Promise.resolve(session);
    },
    redirect() {
      return '/shop';
    },
  },
  debug: true,
};
