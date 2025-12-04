import { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthService } from '@/lib/api/services/AuthService';
import type { TokenObtainPairRequest } from '@/lib/api/models/TokenObtainPairRequest';
import type { User } from '@/lib/api/models/User';
import
{
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials)
      {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required');
        }

        try {
          const tokenResponse = await AuthService.authLoginCreate({
            username: credentials.username,
            password: credentials.password,
          } as TokenObtainPairRequest);

          // Set token temporarily to fetch profile
          const { OpenAPI } = await import('@/lib/api/core/OpenAPI');
          const originalToken = OpenAPI.TOKEN;
          OpenAPI.TOKEN = tokenResponse.access;

          // Fetch user profile
          const user = await AuthService.authProfileRetrieve();

          // Restore original token
          OpenAPI.TOKEN = originalToken;

          return {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            fullName: user.full_name,
            role: user.role,
            phone: user.phone,
            emailVerified: user.email_verified,
            identityVerified: user.identity_verified,
            profilePhoto: user.profile_photo,
            accessToken: tokenResponse.access,
            refreshToken: tokenResponse.refresh,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session })
    {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.fullName = user.fullName;
        token.role = user.role;
        token.phone = user.phone;
        token.emailVerified = user.emailVerified;
        token.identityVerified = user.identityVerified;
        token.profilePhoto = user.profilePhoto;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        // Set expiration to 15 minutes from now (typical JWT access token lifetime)
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000;
      }

      // Handle session update trigger
      if (trigger === 'update' && session) {
        if (session.user) {
          token.firstName = session.user.firstName;
          token.lastName = session.user.lastName;
          token.fullName = session.user.fullName;
          token.phone = session.user.phone;
          token.profilePhoto = session.user.profilePhoto;
        }
      }

      // Return previous token if it hasn't expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to refresh it
      return await refreshAccessToken(token);
    },
    async session({ session, token })
    {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          fullName: token.fullName,
          role: token.role,
          phone: token.phone,
          emailVerified: token.emailVerified,
          identityVerified: token.identityVerified,
          profilePhoto: token.profilePhoto,
        };
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Refreshes the access token using the refresh token
 */
async function refreshAccessToken(token: any)
{
  try {
    const { AuthService } = await import('@/lib/api/services/AuthService');
    const { TokenRefreshRequest } = await import('@/lib/api/models/TokenRefreshRequest');
    const { OpenAPI } = await import('@/lib/api/core/OpenAPI');

    // Temporarily set the token for the refresh request
    const originalToken = OpenAPI.TOKEN;
    OpenAPI.TOKEN = token.refreshToken;

    const response = await AuthService.authRefreshTokenCreate({
      refresh: token.refreshToken,
    } as any);

    // Restore original token
    OpenAPI.TOKEN = originalToken;

    return {
      ...token,
      accessToken: response.access,
      refreshToken: response.refresh ?? token.refreshToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000,
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}


export function serverSession(
  ...args: [
    GetServerSidePropsContext[ "req" ],
    GetServerSidePropsContext[ "res" ]
  ] | [ NextApiRequest, NextApiResponse ] | []
)
{
  return getServerSession(...args, authOptions);
}

