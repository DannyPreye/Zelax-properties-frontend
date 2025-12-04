import { http, HttpResponse } from 'msw';
import type { User } from '@/lib/api/models/User';
import { createMockUser } from '@/lib/test-helpers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://zelax-properties-23443.fly.dev/api';

export const handlers = [
  // Login
  http.post(`${API_BASE_URL}/auth/login/`, async ({ request }) => {
    const body = await request.json() as { username: string; password: string };

    if (body.username === 'testuser' && body.password === 'password123') {
      return HttpResponse.json({
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
      });
    }

    return HttpResponse.json(
      { detail: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // Register
  http.post(`${API_BASE_URL}/auth/register/`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      username: body.username,
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      role: body.role,
      phone: body.phone,
    });
  }),

  // Get profile
  http.get(`${API_BASE_URL}/auth/profile/`, () => {
    return HttpResponse.json(createMockUser());
  }),

  // Update profile
  http.patch(`${API_BASE_URL}/auth/profile/`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      ...createMockUser(),
      ...body,
    });
  }),

  // Refresh token
  http.post(`${API_BASE_URL}/auth/refresh-token/`, () => {
    return HttpResponse.json({
      access: 'new-mock-access-token',
      refresh: 'new-mock-refresh-token',
    });
  }),
];



