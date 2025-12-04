/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PasswordReset } from '../models/PasswordReset';
import type { PasswordResetConfirm } from '../models/PasswordResetConfirm';
import type { PasswordResetConfirmRequest } from '../models/PasswordResetConfirmRequest';
import type { PasswordResetRequest } from '../models/PasswordResetRequest';
import type { PatchedUserRequest } from '../models/PatchedUserRequest';
import type { TokenBlacklistRequest } from '../models/TokenBlacklistRequest';
import type { TokenObtainPair } from '../models/TokenObtainPair';
import type { TokenObtainPairRequest } from '../models/TokenObtainPairRequest';
import type { TokenRefresh } from '../models/TokenRefresh';
import type { TokenRefreshRequest } from '../models/TokenRefreshRequest';
import type { User } from '../models/User';
import type { UserPublic } from '../models/UserPublic';
import type { UserRegistration } from '../models/UserRegistration';
import type { UserRegistrationRequest } from '../models/UserRegistrationRequest';
import type { UserRequest } from '../models/UserRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * View for getting public user profile
     * @param id
     * @returns UserPublic
     * @throws ApiError
     */
    public static authRetrieve(
        id: number,
    ): CancelablePromise<UserPublic> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     * @param requestBody
     * @returns TokenObtainPair
     * @throws ApiError
     */
    public static authLoginCreate(
        requestBody: TokenObtainPairRequest,
    ): CancelablePromise<TokenObtainPair> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Takes a token and blacklists it. Must be used with the
     * `rest_framework_simplejwt.token_blacklist` app installed.
     * @param requestBody
     * @returns any No response body
     * @throws ApiError
     */
    public static authLogoutCreate(
        requestBody: TokenBlacklistRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * View for password reset request
     * @param requestBody
     * @returns PasswordReset
     * @throws ApiError
     */
    public static authPasswordResetCreate(
        requestBody: PasswordResetRequest,
    ): CancelablePromise<PasswordReset> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/password-reset/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * View for password reset confirmation
     * @param requestBody
     * @returns PasswordResetConfirm
     * @throws ApiError
     */
    public static authPasswordResetConfirmCreate(
        requestBody: PasswordResetConfirmRequest,
    ): CancelablePromise<PasswordResetConfirm> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/password-reset/confirm/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * View for getting and updating current user profile
     * @returns User
     * @throws ApiError
     */
    public static authProfileRetrieve(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/profile/',
        });
    }
    /**
     * View for getting and updating current user profile
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static authProfileUpdate(
        requestBody: UserRequest,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/auth/profile/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * View for getting and updating current user profile
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static authProfilePartialUpdate(
        requestBody?: PatchedUserRequest,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/auth/profile/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     * @param requestBody
     * @returns TokenRefresh
     * @throws ApiError
     */
    public static authRefreshTokenCreate(
        requestBody: TokenRefreshRequest,
    ): CancelablePromise<TokenRefresh> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/refresh-token/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * View for user registration
     * @param requestBody
     * @returns UserRegistration
     * @throws ApiError
     */
    public static authRegisterCreate(
        requestBody: UserRegistrationRequest,
    ): CancelablePromise<UserRegistration> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * View for email verification
     * @returns any No response body
     * @throws ApiError
     */
    public static authVerifyEmailCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/verify-email/',
        });
    }
}
