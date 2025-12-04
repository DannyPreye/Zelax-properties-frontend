/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserPublic } from './UserPublic';
/**
 * Serializer for messages
 */
export type Message = {
    readonly id: number;
    readonly sender: UserPublic;
    content: string;
    readonly is_read: boolean;
    readonly created_at: string;
};

