/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PropertyTypeEnum } from './PropertyTypeEnum';
/**
 * Serializer for property list view
 */
export type PropertyListRequest = {
    title: string;
    property_type?: PropertyTypeEnum;
    city: string;
    country: string;
    base_price: string;
    max_guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: string;
};

