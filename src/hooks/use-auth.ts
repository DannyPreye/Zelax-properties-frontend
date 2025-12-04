'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { setAccessToken, setRefreshToken } from '@/lib/api/client';

export function useAuth() {
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      setAccessToken(session.accessToken);
      setRefreshToken(session.refreshToken);
    } else {
      setAccessToken(null);
      setRefreshToken(null);
    }
  }, [session]);

  return {
    user: session?.user,
    session,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    isUnauthenticated: status === 'unauthenticated',
    update,
  };
}





