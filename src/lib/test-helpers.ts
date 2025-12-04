import type { User } from '@/lib/api/models/User';
import type { RoleEnum } from '@/lib/api/models/RoleEnum';

export function createMockUser(overrides?: Partial<User>): User {
  return {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
    full_name: 'Test User',
    role: 'guest' as RoleEnum,
    phone: '+1234567890',
    email_verified: false,
    identity_verified: false,
    profile_photo: null,
    bio: null,
    profile: {
      date_of_birth: null,
      nationality: undefined,
      languages: undefined,
      emergency_contact_name: undefined,
      emergency_contact_phone: undefined,
    },
    date_joined: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockHostUser(overrides?: Partial<User>): User {
  return createMockUser({
    role: 'host' as RoleEnum,
    ...overrides,
  });
}

export function createMockGuestUser(overrides?: Partial<User>): User {
  return createMockUser({
    role: 'guest' as RoleEnum,
    ...overrides,
  });
}

