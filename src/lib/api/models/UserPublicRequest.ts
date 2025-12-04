/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for public user profile (limited fields)
 */
export type UserPublicRequest = {
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    first_name?: string;
    last_name?: string;
    profile_photo?: Blob | null;
    bio?: string;
    identity_verified?: boolean;
};

