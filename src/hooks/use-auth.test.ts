import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from './use-auth';
import { useSession } from 'next-auth/react';
import * as client from '@/lib/api/client';

vi.mock('next-auth/react');
vi.mock('@/lib/api/client', () => ({
  setAccessToken: vi.fn(),
  setRefreshToken: vi.fn(),
}));

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set tokens when session is available', async () => {
    const mockSession = {
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        fullName: 'Test User',
        role: 'guest',
        emailVerified: false,
        identityVerified: false,
      },
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
    };

    vi.mocked(useSession).mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: vi.fn(),
    } as any);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(client.setAccessToken).toHaveBeenCalledWith('test-access-token');
      expect(client.setRefreshToken).toHaveBeenCalledWith('test-refresh-token');
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockSession.user);
  });

  it('should clear tokens when session is not available', async () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn(),
    } as any);

    renderHook(() => useAuth());

    await waitFor(() => {
      expect(client.setAccessToken).toHaveBeenCalledWith(null);
      expect(client.setRefreshToken).toHaveBeenCalledWith(null);
    });
  });
});








