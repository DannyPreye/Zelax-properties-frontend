/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from '../models/Booking';
import type { BookingCreate } from '../models/BookingCreate';
import type { BookingCreateRequest } from '../models/BookingCreateRequest';
import type { BookingRequest } from '../models/BookingRequest';
import type { PaginatedBookingList } from '../models/PaginatedBookingList';
import type { PatchedBookingRequest } from '../models/PatchedBookingRequest';
import type { PriceCalculation } from '../models/PriceCalculation';
import type { PriceCalculationRequest } from '../models/PriceCalculationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookingsService {
    /**
     * ViewSet for booking operations
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedBookingList
     * @throws ApiError
     */
    public static bookingsList(
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedBookingList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/bookings/',
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * ViewSet for booking operations
     * @param requestBody
     * @returns BookingCreate
     * @throws ApiError
     */
    public static bookingsCreate(
        requestBody: BookingCreateRequest,
    ): CancelablePromise<BookingCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/bookings/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for booking operations
     * @param id A unique integer value identifying this booking.
     * @returns Booking
     * @throws ApiError
     */
    public static bookingsRetrieve(
        id: number,
    ): CancelablePromise<Booking> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/bookings/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for booking operations
     * @param id A unique integer value identifying this booking.
     * @param requestBody
     * @returns Booking
     * @throws ApiError
     */
    public static bookingsUpdate(
        id: number,
        requestBody: BookingRequest,
    ): CancelablePromise<Booking> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/bookings/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for booking operations
     * @param id A unique integer value identifying this booking.
     * @param requestBody
     * @returns Booking
     * @throws ApiError
     */
    public static bookingsPartialUpdate(
        id: number,
        requestBody?: PatchedBookingRequest,
    ): CancelablePromise<Booking> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/bookings/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for booking operations
     * @param id A unique integer value identifying this booking.
     * @returns void
     * @throws ApiError
     */
    public static bookingsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/bookings/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Calculate booking price
     * @param id A unique integer value identifying this booking.
     * @returns Booking
     * @throws ApiError
     */
    public static bookingsCalculatePriceRetrieve(
        id: number,
    ): CancelablePromise<Booking> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/bookings/{id}/calculate-price/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Cancel a booking
     * @param id A unique integer value identifying this booking.
     * @param requestBody
     * @returns Booking
     * @throws ApiError
     */
    public static bookingsCancelCreate(
        id: number,
        requestBody: BookingRequest,
    ): CancelablePromise<Booking> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/bookings/{id}/cancel/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Host confirms a booking
     * @param id A unique integer value identifying this booking.
     * @param requestBody
     * @returns Booking
     * @throws ApiError
     */
    public static bookingsConfirmCreate(
        id: number,
        requestBody: BookingRequest,
    ): CancelablePromise<Booking> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/bookings/{id}/confirm/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * View for calculating booking price before creating booking
     * @param requestBody
     * @returns PriceCalculation
     * @throws ApiError
     */
    public static bookingsCalculatePriceCreate(
        requestBody: PriceCalculationRequest,
    ): CancelablePromise<PriceCalculation> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/bookings/calculate-price/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
