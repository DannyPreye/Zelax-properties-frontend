/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WishlistItem } from './WishlistItem';
/**
 * Serializer for wishlists
 */
export type Wishlist = {
    readonly id: number;
    name: string;
    is_public?: boolean;
    readonly items: Array<WishlistItem>;
    readonly item_count: string;
    readonly created_at: string;
    readonly updated_at: string;
};

