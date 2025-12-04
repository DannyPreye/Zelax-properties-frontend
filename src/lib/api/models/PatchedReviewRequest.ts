/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewTypeEnum } from './ReviewTypeEnum';
/**
 * Serializer for review list/detail
 */
export type PatchedReviewRequest = {
    review_type?: ReviewTypeEnum;
    rating?: number;
    cleanliness?: number | null;
    accuracy?: number | null;
    communication?: number | null;
    location?: number | null;
    value?: number | null;
    comment?: string;
    is_visible?: boolean;
};

