/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from './Booking';
import type { PropertyList } from './PropertyList';
import type { ReviewTypeEnum } from './ReviewTypeEnum';
import type { UserPublic } from './UserPublic';
/**
 * Serializer for review list/detail
 */
export type Review = {
    readonly id: number;
    readonly booking: Booking;
    readonly reviewer: UserPublic;
    readonly reviewee: UserPublic;
    readonly property: PropertyList;
    review_type: ReviewTypeEnum;
    rating: number;
    cleanliness?: number | null;
    accuracy?: number | null;
    communication?: number | null;
    location?: number | null;
    value?: number | null;
    comment?: string;
    is_visible?: boolean;
    readonly created_at: string;
    readonly updated_at: string;
};

