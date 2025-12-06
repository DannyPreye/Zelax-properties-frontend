/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedPaymentList } from '../models/PaginatedPaymentList';
import type { PaginatedPayoutList } from '../models/PaginatedPayoutList';
import type { Payment } from '../models/Payment';
import type { PaymentRequest } from '../models/PaymentRequest';
import type { Payout } from '../models/Payout';
import type { PayoutRequest } from '../models/PayoutRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaymentsService {
    /**
     * ViewSet for payment operations
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedPaymentList
     * @throws ApiError
     */
    public static paymentsList(
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedPaymentList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payments/',
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * ViewSet for payment operations
     * @param id A unique integer value identifying this payment.
     * @returns Payment
     * @throws ApiError
     */
    public static paymentsRetrieve(
        id: number,
    ): CancelablePromise<Payment> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payments/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Initialize Paystack payment
     * @param requestBody
     * @returns Payment
     * @throws ApiError
     */
    public static paymentsInitializeCreate(
        requestBody: PaymentRequest,
    ): CancelablePromise<Payment> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payments/initialize/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for payout operations
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedPayoutList
     * @throws ApiError
     */
    public static paymentsPayoutsList(
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedPayoutList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payments/payouts/',
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * ViewSet for payout operations
     * @param id A unique integer value identifying this payout.
     * @returns Payout
     * @throws ApiError
     */
    public static paymentsPayoutsRetrieve(
        id: number,
    ): CancelablePromise<Payout> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payments/payouts/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Request payout
     * @param requestBody
     * @returns Payout
     * @throws ApiError
     */
    public static paymentsPayoutsRequestCreate(
        requestBody: PayoutRequest,
    ): CancelablePromise<Payout> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payments/payouts/request/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Verify Paystack payment
     * @param requestBody
     * @returns Payment
     * @throws ApiError
     */
    public static paymentsVerifyCreate(
        requestBody: PaymentRequest,
    ): CancelablePromise<Payment> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payments/verify/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
