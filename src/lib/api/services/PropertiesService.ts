/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Availability } from '../models/Availability';
import type { AvailabilityRequest } from '../models/AvailabilityRequest';
import type { BlockedDate } from '../models/BlockedDate';
import type { BlockedDateRequest } from '../models/BlockedDateRequest';
import type { PaginatedAvailabilityList } from '../models/PaginatedAvailabilityList';
import type { PaginatedBlockedDateList } from '../models/PaginatedBlockedDateList';
import type { PaginatedPropertyListList } from '../models/PaginatedPropertyListList';
import type { PaginatedPropertyPhotoList } from '../models/PaginatedPropertyPhotoList';
import type { PatchedAvailabilityRequest } from '../models/PatchedAvailabilityRequest';
import type { PatchedBlockedDateRequest } from '../models/PatchedBlockedDateRequest';
import type { PatchedPropertyCreateUpdateRequest } from '../models/PatchedPropertyCreateUpdateRequest';
import type { PatchedPropertyPhotoRequest } from '../models/PatchedPropertyPhotoRequest';
import type { PropertyCreateUpdate } from '../models/PropertyCreateUpdate';
import type { PropertyCreateUpdateRequest } from '../models/PropertyCreateUpdateRequest';
import type { PropertyDetail } from '../models/PropertyDetail';
import type { PropertyDetailRequest } from '../models/PropertyDetailRequest';
import type { PropertyPhoto } from '../models/PropertyPhoto';
import type { PropertyPhotoRequest } from '../models/PropertyPhotoRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PropertiesService {
    /**
     * ViewSet for property CRUD operations
     * @param bathrooms
     * @param bedrooms
     * @param beds
     * @param checkIn
     * @param checkOut
     * @param city
     * @param country
     * @param hasAc
     * @param hasKitchen
     * @param hasParking
     * @param hasPool
     * @param hasWifi
     * @param latitude
     * @param longitude
     * @param maxPrice
     * @param minGuests
     * @param minPrice
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param propertyType * `apartment` - Apartment
     * * `house` - House
     * * `villa` - Villa
     * * `condo` - Condo
     * * `townhouse` - Townhouse
     * * `studio` - Studio
     * * `cabin` - Cabin
     * * `cottage` - Cottage
     * * `other` - Other
     * @param radiusKm
     * @param search A search term.
     * @param status * `active` - Active
     * * `inactive` - Inactive
     * * `under_review` - Under Review
     * @returns PaginatedPropertyListList
     * @throws ApiError
     */
    public static propertiesList(
        bathrooms?: number,
        bedrooms?: number,
        beds?: number,
        checkIn?: string,
        checkOut?: string,
        city?: string,
        country?: string,
        hasAc?: boolean,
        hasKitchen?: boolean,
        hasParking?: boolean,
        hasPool?: boolean,
        hasWifi?: boolean,
        latitude?: number,
        longitude?: number,
        maxPrice?: number,
        minGuests?: number,
        minPrice?: number,
        ordering?: string,
        page?: number,
        propertyType?: 'apartment' | 'cabin' | 'condo' | 'cottage' | 'house' | 'other' | 'studio' | 'townhouse' | 'villa',
        radiusKm?: number,
        search?: string,
        status?: 'active' | 'inactive' | 'under_review',
    ): CancelablePromise<PaginatedPropertyListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/properties/',
            query: {
                'bathrooms': bathrooms,
                'bedrooms': bedrooms,
                'beds': beds,
                'check_in': checkIn,
                'check_out': checkOut,
                'city': city,
                'country': country,
                'has_ac': hasAc,
                'has_kitchen': hasKitchen,
                'has_parking': hasParking,
                'has_pool': hasPool,
                'has_wifi': hasWifi,
                'latitude': latitude,
                'longitude': longitude,
                'max_price': maxPrice,
                'min_guests': minGuests,
                'min_price': minPrice,
                'ordering': ordering,
                'page': page,
                'property_type': propertyType,
                'radius_km': radiusKm,
                'search': search,
                'status': status,
            },
        });
    }
    /**
     * ViewSet for property CRUD operations
     * @param requestBody
     * @returns PropertyCreateUpdate
     * @throws ApiError
     */
    public static propertiesCreate(
        requestBody: PropertyCreateUpdateRequest,
    ): CancelablePromise<PropertyCreateUpdate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/properties/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for property CRUD operations
     * @param id A unique integer value identifying this property.
     * @returns PropertyDetail
     * @throws ApiError
     */
    public static propertiesRetrieve(
        id: number,
    ): CancelablePromise<PropertyDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/properties/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for property CRUD operations
     * @param id A unique integer value identifying this property.
     * @param requestBody
     * @returns PropertyCreateUpdate
     * @throws ApiError
     */
    public static propertiesUpdate(
        id: number,
        requestBody: PropertyCreateUpdateRequest,
    ): CancelablePromise<PropertyCreateUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/properties/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for property CRUD operations
     * @param id A unique integer value identifying this property.
     * @param requestBody
     * @returns PropertyCreateUpdate
     * @throws ApiError
     */
    public static propertiesPartialUpdate(
        id: number,
        requestBody?: PatchedPropertyCreateUpdateRequest,
    ): CancelablePromise<PropertyCreateUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/properties/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for property CRUD operations
     * @param id A unique integer value identifying this property.
     * @returns void
     * @throws ApiError
     */
    public static propertiesDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/properties/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get availability calendar for a property
     * @param id A unique integer value identifying this property.
     * @returns PropertyDetail
     * @throws ApiError
     */
    public static propertiesAvailabilityRetrieve(
        id: number,
    ): CancelablePromise<PropertyDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/properties/{id}/availability/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Upload photos for a property
     * @param id A unique integer value identifying this property.
     * @param requestBody
     * @returns PropertyDetail
     * @throws ApiError
     */
    public static propertiesPhotosCreate(
        id: number,
        requestBody: PropertyDetailRequest,
    ): CancelablePromise<PropertyDetail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/properties/{id}/photos/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for availability calendar
     * @param propertyPk
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedAvailabilityList
     * @throws ApiError
     */
    public static propertiesAvailabilityList(
        propertyPk: number,
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedAvailabilityList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/properties/{property_pk}/availability/',
            path: {
                'property_pk': propertyPk,
            },
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * ViewSet for availability calendar
     * @param propertyPk
     * @param requestBody
     * @returns Availability
     * @throws ApiError
     */
    public static propertiesAvailabilityCreate(
        propertyPk: number,
        requestBody: AvailabilityRequest,
    ): CancelablePromise<Availability> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/properties/{property_pk}/availability/',
            path: {
                'property_pk': propertyPk,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for availability calendar
     * @param id
     * @param propertyPk
     * @returns Availability
     * @throws ApiError
     */
    public static propertiesAvailabilityRetrieve2(
        id: number,
        propertyPk: number,
    ): CancelablePromise<Availability> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/properties/{property_pk}/availability/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
        });
    }
    /**
     * ViewSet for availability calendar
     * @param id
     * @param propertyPk
     * @param requestBody
     * @returns Availability
     * @throws ApiError
     */
    public static propertiesAvailabilityUpdate(
        id: number,
        propertyPk: number,
        requestBody: AvailabilityRequest,
    ): CancelablePromise<Availability> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/properties/{property_pk}/availability/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for availability calendar
     * @param id
     * @param propertyPk
     * @param requestBody
     * @returns Availability
     * @throws ApiError
     */
    public static propertiesAvailabilityPartialUpdate(
        id: number,
        propertyPk: number,
        requestBody?: PatchedAvailabilityRequest,
    ): CancelablePromise<Availability> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/properties/{property_pk}/availability/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for availability calendar
     * @param id
     * @param propertyPk
     * @returns void
     * @throws ApiError
     */
    public static propertiesAvailabilityDestroy(
        id: number,
        propertyPk: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/properties/{property_pk}/availability/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
        });
    }
    /**
     * ViewSet for blocked dates
     * @param propertyPk
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedBlockedDateList
     * @throws ApiError
     */
    public static propertiesBlockedDatesList(
        propertyPk: number,
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedBlockedDateList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/properties/{property_pk}/blocked-dates/',
            path: {
                'property_pk': propertyPk,
            },
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * ViewSet for blocked dates
     * @param propertyPk
     * @param requestBody
     * @returns BlockedDate
     * @throws ApiError
     */
    public static propertiesBlockedDatesCreate(
        propertyPk: number,
        requestBody: BlockedDateRequest,
    ): CancelablePromise<BlockedDate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/properties/{property_pk}/blocked-dates/',
            path: {
                'property_pk': propertyPk,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for blocked dates
     * @param id
     * @param propertyPk
     * @returns BlockedDate
     * @throws ApiError
     */
    public static propertiesBlockedDatesRetrieve(
        id: number,
        propertyPk: number,
    ): CancelablePromise<BlockedDate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/properties/{property_pk}/blocked-dates/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
        });
    }
    /**
     * ViewSet for blocked dates
     * @param id
     * @param propertyPk
     * @param requestBody
     * @returns BlockedDate
     * @throws ApiError
     */
    public static propertiesBlockedDatesUpdate(
        id: number,
        propertyPk: number,
        requestBody: BlockedDateRequest,
    ): CancelablePromise<BlockedDate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/properties/{property_pk}/blocked-dates/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for blocked dates
     * @param id
     * @param propertyPk
     * @param requestBody
     * @returns BlockedDate
     * @throws ApiError
     */
    public static propertiesBlockedDatesPartialUpdate(
        id: number,
        propertyPk: number,
        requestBody?: PatchedBlockedDateRequest,
    ): CancelablePromise<BlockedDate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/properties/{property_pk}/blocked-dates/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for blocked dates
     * @param id
     * @param propertyPk
     * @returns void
     * @throws ApiError
     */
    public static propertiesBlockedDatesDestroy(
        id: number,
        propertyPk: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/properties/{property_pk}/blocked-dates/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
        });
    }
    /**
     * ViewSet for property photos
     * @param propertyPk
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedPropertyPhotoList
     * @throws ApiError
     */
    public static propertiesPhotosList(
        propertyPk: number,
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedPropertyPhotoList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/properties/{property_pk}/photos/',
            path: {
                'property_pk': propertyPk,
            },
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * ViewSet for property photos
     * @param propertyPk
     * @param requestBody
     * @returns PropertyPhoto
     * @throws ApiError
     */
    public static propertiesPhotosCreate2(
        propertyPk: number,
        requestBody: PropertyPhotoRequest,
    ): CancelablePromise<PropertyPhoto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/properties/{property_pk}/photos/',
            path: {
                'property_pk': propertyPk,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for property photos
     * @param id
     * @param propertyPk
     * @returns PropertyPhoto
     * @throws ApiError
     */
    public static propertiesPhotosRetrieve(
        id: number,
        propertyPk: number,
    ): CancelablePromise<PropertyPhoto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/properties/{property_pk}/photos/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
        });
    }
    /**
     * ViewSet for property photos
     * @param id
     * @param propertyPk
     * @param requestBody
     * @returns PropertyPhoto
     * @throws ApiError
     */
    public static propertiesPhotosUpdate(
        id: number,
        propertyPk: number,
        requestBody: PropertyPhotoRequest,
    ): CancelablePromise<PropertyPhoto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/properties/{property_pk}/photos/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for property photos
     * @param id
     * @param propertyPk
     * @param requestBody
     * @returns PropertyPhoto
     * @throws ApiError
     */
    public static propertiesPhotosPartialUpdate(
        id: number,
        propertyPk: number,
        requestBody?: PatchedPropertyPhotoRequest,
    ): CancelablePromise<PropertyPhoto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/properties/{property_pk}/photos/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for property photos
     * @param id
     * @param propertyPk
     * @returns void
     * @throws ApiError
     */
    public static propertiesPhotosDestroy(
        id: number,
        propertyPk: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/properties/{property_pk}/photos/{id}/',
            path: {
                'id': id,
                'property_pk': propertyPk,
            },
        });
    }
    /**
     * ViewSet for property CRUD operations
     * @param bathrooms
     * @param bedrooms
     * @param beds
     * @param checkIn
     * @param checkOut
     * @param city
     * @param country
     * @param hasAc
     * @param hasKitchen
     * @param hasParking
     * @param hasPool
     * @param hasWifi
     * @param latitude
     * @param longitude
     * @param maxPrice
     * @param minGuests
     * @param minPrice
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param propertyType * `apartment` - Apartment
     * * `house` - House
     * * `villa` - Villa
     * * `condo` - Condo
     * * `townhouse` - Townhouse
     * * `studio` - Studio
     * * `cabin` - Cabin
     * * `cottage` - Cottage
     * * `other` - Other
     * @param radiusKm
     * @param search A search term.
     * @param status * `active` - Active
     * * `inactive` - Inactive
     * * `under_review` - Under Review
     * @returns PaginatedPropertyListList
     * @throws ApiError
     */
    public static propertiesSearchList(
        bathrooms?: number,
        bedrooms?: number,
        beds?: number,
        checkIn?: string,
        checkOut?: string,
        city?: string,
        country?: string,
        hasAc?: boolean,
        hasKitchen?: boolean,
        hasParking?: boolean,
        hasPool?: boolean,
        hasWifi?: boolean,
        latitude?: number,
        longitude?: number,
        maxPrice?: number,
        minGuests?: number,
        minPrice?: number,
        ordering?: string,
        page?: number,
        propertyType?: 'apartment' | 'cabin' | 'condo' | 'cottage' | 'house' | 'other' | 'studio' | 'townhouse' | 'villa',
        radiusKm?: number,
        search?: string,
        status?: 'active' | 'inactive' | 'under_review',
    ): CancelablePromise<PaginatedPropertyListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/properties/search/',
            query: {
                'bathrooms': bathrooms,
                'bedrooms': bedrooms,
                'beds': beds,
                'check_in': checkIn,
                'check_out': checkOut,
                'city': city,
                'country': country,
                'has_ac': hasAc,
                'has_kitchen': hasKitchen,
                'has_parking': hasParking,
                'has_pool': hasPool,
                'has_wifi': hasWifi,
                'latitude': latitude,
                'longitude': longitude,
                'max_price': maxPrice,
                'min_guests': minGuests,
                'min_price': minPrice,
                'ordering': ordering,
                'page': page,
                'property_type': propertyType,
                'radius_km': radiusKm,
                'search': search,
                'status': status,
            },
        });
    }
}
