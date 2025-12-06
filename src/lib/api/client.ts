import { OpenAPI } from './core/OpenAPI';
import { AuthService } from './services/AuthService';
import type { TokenRefreshRequest } from './models/TokenRefreshRequest';

let refreshTokenPromise: Promise<string> | null = null;

/**
 * Sets the access token for API requests
 */
export function setAccessToken(token: string | null) {
  OpenAPI.TOKEN = token || undefined;
}

/**
 * Sets the refresh token (stored separately for refresh logic)
 */
let storedRefreshToken: string | null = null;

export function setRefreshToken(token: string | null) {
  storedRefreshToken = token;
}

/**
 * Gets the current refresh token
 */
export function getRefreshToken(): string | null {
  return storedRefreshToken;
}

/**
 * Refreshes the access token using the refresh token
 */
async function refreshAccessToken(): Promise<string> {
  if (!storedRefreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await AuthService.authRefreshTokenCreate({
      refresh: storedRefreshToken,
    } as TokenRefreshRequest);

    const newAccessToken = response.access;
    setAccessToken(newAccessToken);

    // Update refresh token if provided
    if (response.refresh) {
      setRefreshToken(response.refresh);
    }

    return newAccessToken;
  } catch (error) {
    // Clear tokens on refresh failure
    setAccessToken(null);
    setRefreshToken(null);
    throw error;
  }
}

/**
 * Refreshes the access token with promise deduplication
 * Prevents multiple simultaneous refresh requests
 */
export async function refreshTokenIfNeeded(): Promise<string | null> {
  if (!storedRefreshToken) {
    return null;
  }

  // If a refresh is already in progress, wait for it
  if (refreshTokenPromise) {
    return refreshTokenPromise;
  }

  // Start new refresh
  refreshTokenPromise = refreshAccessToken()
    .finally(() => {
      refreshTokenPromise = null;
    });

  return refreshTokenPromise;
}

/**
 * Clears all tokens
 */
export function clearTokens() {
  setAccessToken(null);
  setRefreshToken(null);
}








