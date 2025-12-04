import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Redirect authenticated users away from auth pages
    if (token) {
      if (path === '/login' || path === '/register') {
        // Redirect to appropriate dashboard based on role
        if (token.role === 'host') {
          return NextResponse.redirect(new URL('/host/dashboard', req.url));
        }
        if (token.role === 'guest') {
          return NextResponse.redirect(new URL('/guest/dashboard', req.url));
        }
        return NextResponse.redirect(new URL('/', req.url));
      }

      // Redirect to appropriate dashboard based on role for root path
      if (path === '/') {
        if (token.role === 'host') {
          return NextResponse.redirect(new URL('/host/dashboard', req.url));
        }
        if (token.role === 'guest') {
          return NextResponse.redirect(new URL('/guest/dashboard', req.url));
        }
      }

      // Protect host onboarding - only hosts can access
      if (path.startsWith('/onboarding/host') && token.role !== 'host') {
        if (token.role === 'guest') {
          return NextResponse.redirect(new URL('/onboarding/guest', req.url));
        }
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Protect guest onboarding - only guests can access
      if (path.startsWith('/onboarding/guest') && token.role !== 'guest') {
        if (token.role === 'host') {
          return NextResponse.redirect(new URL('/onboarding/host', req.url));
        }
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Protect host routes - only hosts can access
      if (path.startsWith('/host') && token.role !== 'host') {
        if (token.role === 'guest') {
          return NextResponse.redirect(new URL('/guest/dashboard', req.url));
        }
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Protect guest routes - only guests can access
      if (path.startsWith('/guest') && token.role !== 'guest') {
        if (token.role === 'host') {
          return NextResponse.redirect(new URL('/host/dashboard', req.url));
        }
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Public routes that don't require authentication
        const publicRoutes = [
          '/login',
          '/register',
          '/api/auth',
          '/',
        ];

        // Check if the path is a public route
        const isPublicRoute = publicRoutes.some((route) => {
          if (route === '/') {
            return path === '/';
          }
          return path.startsWith(route);
        });

        if (isPublicRoute) {
          return true;
        }

        // All other routes require authentication
        // This includes:
        // - /onboarding/* (onboarding routes)
        // - /host/* (host routes)
        // - /guest/* (guest routes)
        // - Any other protected routes
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - Static assets (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};

