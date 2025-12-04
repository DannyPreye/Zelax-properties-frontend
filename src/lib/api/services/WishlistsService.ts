/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedWishlistList } from '../models/PaginatedWishlistList';
import type { PatchedWishlistRequest } from '../models/PatchedWishlistRequest';
import type { Wishlist } from '../models/Wishlist';
import type { WishlistCreate } from '../models/WishlistCreate';
import type { WishlistCreateRequest } from '../models/WishlistCreateRequest';
import type { WishlistRequest } from '../models/WishlistRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WishlistsService {
    /**
     * ViewSet for wishlist operations
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedWishlistList
     * @throws ApiError
     */
    public static wishlistsList(
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedWishlistList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/wishlists/',
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * ViewSet for wishlist operations
     * @param requestBody
     * @returns WishlistCreate
     * @throws ApiError
     */
    public static wishlistsCreate(
        requestBody: WishlistCreateRequest,
    ): CancelablePromise<WishlistCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/wishlists/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for wishlist operations
     * @param id
     * @returns Wishlist
     * @throws ApiError
     */
    public static wishlistsRetrieve(
        id: string,
    ): CancelablePromise<Wishlist> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/wishlists/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for wishlist operations
     * @param id
     * @param requestBody
     * @returns Wishlist
     * @throws ApiError
     */
    public static wishlistsUpdate(
        id: string,
        requestBody: WishlistRequest,
    ): CancelablePromise<Wishlist> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/wishlists/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for wishlist operations
     * @param id
     * @param requestBody
     * @returns Wishlist
     * @throws ApiError
     */
    public static wishlistsPartialUpdate(
        id: string,
        requestBody?: PatchedWishlistRequest,
    ): CancelablePromise<Wishlist> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/wishlists/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for wishlist operations
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static wishlistsDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/wishlists/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Add or remove property from wishlist
     * @param id
     * @param propertyId
     * @param requestBody
     * @returns Wishlist
     * @throws ApiError
     */
    public static wishlistsPropertiesCreate(
        id: string,
        propertyId: string,
        requestBody: WishlistRequest,
    ): CancelablePromise<Wishlist> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/wishlists/{id}/properties/{property_id}/',
            path: {
                'id': id,
                'property_id': propertyId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Add or remove property from wishlist
     * @param id
     * @param propertyId
     * @returns void
     * @throws ApiError
     */
    public static wishlistsPropertiesDestroy(
        id: string,
        propertyId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/wishlists/{id}/properties/{property_id}/',
            path: {
                'id': id,
                'property_id': propertyId,
            },
        });
    }
}
