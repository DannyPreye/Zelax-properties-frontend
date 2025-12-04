/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedReviewList } from '../models/PaginatedReviewList';
import type { PatchedReviewRequest } from '../models/PatchedReviewRequest';
import type { Review } from '../models/Review';
import type { ReviewCreate } from '../models/ReviewCreate';
import type { ReviewCreateRequest } from '../models/ReviewCreateRequest';
import type { ReviewRequest } from '../models/ReviewRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReviewsService {
    /**
     * ViewSet for review operations
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedReviewList
     * @throws ApiError
     */
    public static reviewsList(
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedReviewList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reviews/',
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * ViewSet for review operations
     * @param requestBody
     * @returns ReviewCreate
     * @throws ApiError
     */
    public static reviewsCreate(
        requestBody: ReviewCreateRequest,
    ): CancelablePromise<ReviewCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/reviews/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for review operations
     * @param id A unique integer value identifying this review.
     * @returns Review
     * @throws ApiError
     */
    public static reviewsRetrieve(
        id: number,
    ): CancelablePromise<Review> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reviews/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for review operations
     * @param id A unique integer value identifying this review.
     * @param requestBody
     * @returns Review
     * @throws ApiError
     */
    public static reviewsUpdate(
        id: number,
        requestBody: ReviewRequest,
    ): CancelablePromise<Review> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/reviews/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for review operations
     * @param id A unique integer value identifying this review.
     * @param requestBody
     * @returns Review
     * @throws ApiError
     */
    public static reviewsPartialUpdate(
        id: number,
        requestBody?: PatchedReviewRequest,
    ): CancelablePromise<Review> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/reviews/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for review operations
     * @param id A unique integer value identifying this review.
     * @returns void
     * @throws ApiError
     */
    public static reviewsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/reviews/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * View for getting reviews for a specific property
     * @param propertyId
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedReviewList
     * @throws ApiError
     */
    public static reviewsPropertiesList(
        propertyId: number,
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedReviewList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reviews/properties/{property_id}/',
            path: {
                'property_id': propertyId,
            },
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * View for getting reviews for a specific user
     * @param userId
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedReviewList
     * @throws ApiError
     */
    public static reviewsUsersList(
        userId: number,
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedReviewList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reviews/users/{user_id}/',
            path: {
                'user_id': userId,
            },
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
}
