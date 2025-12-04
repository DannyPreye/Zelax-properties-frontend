/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancellationPolicyEnum } from './CancellationPolicyEnum';
import type { PropertyDetailStatusEnum } from './PropertyDetailStatusEnum';
import type { PropertyTypeEnum } from './PropertyTypeEnum';
/**
 * Serializer for property detail view
 */
export type PropertyDetailRequest = {
    title: string;
    description: string;
    property_type?: PropertyTypeEnum;
    address: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
    amenities: any;
    house_rules?: string;
    cancellation_policy?: CancellationPolicyEnum;
    base_price: string;
    cleaning_fee?: string;
    service_fee?: string;
    max_guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: string;
    instant_booking?: boolean;
    min_stay?: number;
    max_stay?: number;
    status?: PropertyDetailStatusEnum;
};

