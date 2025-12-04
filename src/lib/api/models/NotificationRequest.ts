/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TypeEnum } from './TypeEnum';
/**
 * Serializer for notifications
 */
export type NotificationRequest = {
    type: TypeEnum;
    title: string;
    message: string;
    is_read?: boolean;
};

