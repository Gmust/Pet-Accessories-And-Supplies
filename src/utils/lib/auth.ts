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

          return { ...user, jwt };
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      // @ts-ignore
      const dbUser = await authService.getUser(user.jwt) as User;
      if (!dbUser) {
        token.id = Number(user.id);
      }
      return {
        id: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
        cart: dbUser.cart,
        reviews: dbUser.reviews,
      };
    },
    async session({ session, token }) {

      if (session && token) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.username = token.username;
        // @ts-ignore
        session.user.email = token.email;
        // @ts-ignore
        session.user.cart = token.cart;
        // @ts-ignore
        session.user.reviews = token.reviews;
      }
      return session;
    },
    redirect() {
      return '/shop';
    },
  },
  debug: true,
};
