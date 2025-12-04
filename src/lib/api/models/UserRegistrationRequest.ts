/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoleEnum } from './RoleEnum';
/**
 * Serializer for user registration
 */
export type UserRegistrationRequest = {
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    email?: string;
    password: string;
    password2: string;
    first_name?: string;
    last_name?: string;
    role?: RoleEnum;
    phone?: string;
};

