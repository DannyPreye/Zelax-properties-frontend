/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from './Booking';
import type { PaymentMethodEnum } from './PaymentMethodEnum';
import type { PaymentStatusEnum } from './PaymentStatusEnum';
import type { UserPublic } from './UserPublic';
/**
 * Serializer for payments
 */
export type Payment = {
    readonly id: number;
    readonly booking: Booking;
    readonly user: UserPublic;
    amount: string;
    currency?: string;
    payment_method?: PaymentMethodEnum;
    readonly transaction_reference: string;
    readonly status: PaymentStatusEnum;
    readonly paystack_reference: string;
    readonly metadata: any;
    readonly created_at: string;
    readonly updated_at: string;
};

