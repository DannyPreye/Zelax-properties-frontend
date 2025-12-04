/**
 * @deprecated This component is deprecated. Route protection is now handled
 * by Next.js middleware in src/lib/auth/middleware.ts
 *
 * Use middleware for route protection instead of this component.
 * The middleware automatically handles:
 * - Authentication checks
 * - Role-based access control
 * - Redirects based on user roles
 *
 * If you need client-side auth checks, use the useAuth hook directly.
 */

"use client";

import { useAuth } from "@/hooks/use-auth";
import type { RoleEnum } from "@/lib/api/models/RoleEnum";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: RoleEnum;
    redirectTo?: string;
}

/**
 * @deprecated Use middleware for route protection instead
 */
export function ProtectedRoute({
    children,
    requiredRole,
    redirectTo = "/login",
}: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, user } = useAuth();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className='flex min-h-screen items-center justify-center'>
                <div className='text-center'>
                    <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent'></div>
                    <p className='mt-4 text-muted-foreground'>Loading...</p>
                </div>
            </div>
        );
    }

    // Middleware handles redirects, but we can still show nothing if not authenticated
    // This is a fallback for client-side rendering
    if (!isAuthenticated) {
        return null;
    }

    // Check role if required
    if (requiredRole && user?.role !== requiredRole) {
        return null;
    }

    return <>{children}</>;
}
