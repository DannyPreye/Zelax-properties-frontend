/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoleEnum } from './RoleEnum';
import type { UserProfile } from './UserProfile';
/**
 * Serializer for user details
 */
export type User = {
    readonly id: number;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    readonly full_name: string;
    role?: RoleEnum;
    phone?: string;
    readonly email_verified: boolean;
    readonly identity_verified: boolean;
    profile_photo?: string | null;
    bio?: string;
    readonly profile: UserProfile;
    readonly date_joined: string;
};

