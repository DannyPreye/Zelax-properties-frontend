/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TypeEnum } from './TypeEnum';
/**
 * Serializer for notifications
 */
export type Notification = {
    readonly id: number;
    type: TypeEnum;
    title: string;
    message: string;
    is_read?: boolean;
    readonly created_at: string;
};

