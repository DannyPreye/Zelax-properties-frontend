import 'next-auth';
import type { RoleEnum } from '@/lib/api/models/RoleEnum';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      username: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      fullName: string;
      role?: RoleEnum;
      phone?: string;
      emailVerified: boolean;
      identityVerified: boolean;
      profilePhoto?: string | null;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: number;
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    fullName: string;
    role?: RoleEnum;
    phone?: string;
    emailVerified: boolean;
    identityVerified: boolean;
    profilePhoto?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    fullName: string;
    role?: RoleEnum;
    phone?: string;
    emailVerified: boolean;
    identityVerified: boolean;
    profilePhoto?: string | null;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}








