/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingStatusEnum } from './BookingStatusEnum';
import type { CancellationPolicyEnum } from './CancellationPolicyEnum';
import type { PropertyList } from './PropertyList';
import type { UserPublic } from './UserPublic';
/**
 * Serializer for booking list/detail
 */
export type Booking = {
    readonly id: number;
    readonly property_obj: PropertyList;
    readonly guest: UserPublic;
    check_in: string;
    check_out: string;
    guest_count: number;
    readonly status: BookingStatusEnum;
    readonly base_price: string;
    readonly cleaning_fee: string;
    readonly service_fee: string;
    readonly security_deposit: string;
    readonly total_price: string;
    readonly cancellation_policy: CancellationPolicyEnum;
    readonly cancelled_at: string | null;
    readonly cancellation_refund: string;
    readonly nights: string;
    readonly is_past: string;
    readonly is_upcoming: string;
    readonly is_current: string;
    readonly created_at: string;
    readonly updated_at: string;
};

