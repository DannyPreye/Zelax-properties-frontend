/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PayoutStatusEnum } from './PayoutStatusEnum';
import type { UserPublic } from './UserPublic';
/**
 * Serializer for payouts
 */
export type Payout = {
    readonly id: number;
    readonly host: UserPublic;
    amount: string;
    currency?: string;
    readonly status: PayoutStatusEnum;
    readonly transaction_reference: string;
    readonly paystack_reference: string;
    readonly processed_at: string | null;
    readonly created_at: string;
    readonly updated_at: string;
};

