import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    async function middleware(req)
    {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Always allow API auth routes - NextAuth handles these
        if (path.startsWith('/api/auth')) {
            return NextResponse.next();
        }

        // Public routes that don't require authentication
        const publicRoutes = [
            '/',
            '/login',
            '/register',
            '/properties',
            '/about',
            '/blog',
            '/terms',
            '/pricing',
        ];

        // Check if the current path is a public route
        const isPublicRoute = publicRoutes.some((route) =>
        {
            if (route === '/') {
                return path === '/';
            }
            return path.startsWith(route);
        });

        // Allow all public routes
        if (isPublicRoute) {
            return NextResponse.next();
        }

        // Redirect authenticated users from auth pages
        if ((path.startsWith('/login') || path.startsWith('/register')) && token) {
            if (token.role === 'host') {
                return NextResponse.redirect(new URL('/host/dashboard', req.url));
            }
            if (token.role === 'guest') {
                return NextResponse.redirect(new URL('/guest/dashboard', req.url));
            }
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Protect host routes
        if (path.startsWith('/host')) {
            if (!token) {
                return NextResponse.redirect(new URL('/login', req.url));
            }
            if (token.role !== 'host') {
                return NextResponse.redirect(new URL('/guest/dashboard', req.url));
            }
        }

        // Protect guest routes
        if (path.startsWith('/guest')) {
            if (!token) {
                return NextResponse.redirect(new URL('/login', req.url));
            }
            if (token.role !== 'guest') {
                return NextResponse.redirect(new URL('/host/dashboard', req.url));
            }
        }

        // Protect onboarding routes
        if (path.startsWith('/onboarding')) {
            if (!token) {
                return NextResponse.redirect(new URL('/login', req.url));
            }
            if (path.startsWith('/onboarding/host') && token.role !== 'host') {
                return NextResponse.redirect(new URL('/guest/dashboard', req.url));
            }
            if (path.startsWith('/onboarding/guest') && token.role !== 'guest') {
                return NextResponse.redirect(new URL('/host/dashboard', req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) =>
            {
                const path = req.nextUrl.pathname;

                // Always allow API auth routes - NextAuth handles these
                if (path.startsWith('/api/auth')) {
                    return true;
                }

                // Allow all public routes
                const publicRoutes = [
                    '/',
                    '/login',
                    '/register',
                    '/properties',
                    '/about',
                    '/blog',
                    '/terms',
                    '/pricing',
                ];

                const isPublicRoute = publicRoutes.some((route) =>
                {
                    if (route === '/') {
                        return path === '/';
                    }
                    return path.startsWith(route);
                });

                if (isPublicRoute) {
                    return true;
                }

                // All other routes require authentication
                return !!token;
            },
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
         * - api/auth (NextAuth handles these)
         * - public folder assets
         */
        '/((?!_next/static|_next/image|_next/webpack-hmr|api/auth|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
    ],
};
