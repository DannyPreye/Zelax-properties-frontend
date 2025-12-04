/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from './Booking';
import type { UserPublic } from './UserPublic';
/**
 * Serializer for message threads
 */
export type MessageThread = {
    readonly id: number;
    readonly booking: Booking;
    readonly participants: Array<UserPublic>;
    readonly last_message: string;
    readonly unread_count: string;
    readonly created_at: string;
    readonly updated_at: string;
};

