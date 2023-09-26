import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';


export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const isAuth = await getToken({ req });

    const isLoginPage = pathname.startsWith('/login');

    const sensitiveRoutes = ['/user'];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {

      if (isAuth) {
        return NextResponse.redirect(new URL('/shop', req.url));
      }

      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathname === '/') {
      return NextResponse.redirect(new URL('/shop', req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      }
    }
  }
);


export const config = {
  matcher: ['/', '/login', '/user/:path*']
};