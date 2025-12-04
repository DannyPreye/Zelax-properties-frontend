/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for public user profile (limited fields)
 */
export type UserPublic = {
    readonly id: number;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    first_name?: string;
    last_name?: string;
    readonly full_name: string;
    profile_photo?: string | null;
    bio?: string;
    identity_verified?: boolean;
};

