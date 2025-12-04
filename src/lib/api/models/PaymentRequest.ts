/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentMethodEnum } from './PaymentMethodEnum';
/**
 * Serializer for payments
 */
export type PaymentRequest = {
    amount: string;
    currency?: string;
    payment_method?: PaymentMethodEnum;
};

