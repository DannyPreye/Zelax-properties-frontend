/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewTypeEnum } from './ReviewTypeEnum';
/**
 * Serializer for creating a review
 */
export type ReviewCreateRequest = {
    booking: number;
    review_type: ReviewTypeEnum;
    rating: number;
    cleanliness?: number | null;
    accuracy?: number | null;
    communication?: number | null;
    location?: number | null;
    value?: number | null;
    comment?: string;
};

