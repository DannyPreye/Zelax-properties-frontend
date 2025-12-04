/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PropertyTypeEnum } from './PropertyTypeEnum';
import type { UserPublic } from './UserPublic';
/**
 * Serializer for property list view
 */
export type PropertyList = {
    readonly id: number;
    title: string;
    property_type?: PropertyTypeEnum;
    city: string;
    country: string;
    base_price: string;
    readonly primary_photo: string;
    readonly host: UserPublic;
    readonly average_rating: string;
    readonly review_count: string;
    max_guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: string;
};

