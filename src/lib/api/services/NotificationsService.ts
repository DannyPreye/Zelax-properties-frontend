/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Notification } from '../models/Notification';
import type { NotificationPreference } from '../models/NotificationPreference';
import type { NotificationPreferenceRequest } from '../models/NotificationPreferenceRequest';
import type { NotificationRequest } from '../models/NotificationRequest';
import type { PaginatedNotificationList } from '../models/PaginatedNotificationList';
import type { PatchedNotificationPreferenceRequest } from '../models/PatchedNotificationPreferenceRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationsService {
    /**
     * ViewSet for notification operations
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedNotificationList
     * @throws ApiError
     */
    public static notificationsList(
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedNotificationList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/notifications/',
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * ViewSet for notification operations
     * @param id A unique integer value identifying this notification.
     * @returns Notification
     * @throws ApiError
     */
    public static notificationsRetrieve(
        id: number,
    ): CancelablePromise<Notification> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/notifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Mark notification as read
     * @param id A unique integer value identifying this notification.
     * @param requestBody
     * @returns Notification
     * @throws ApiError
     */
    public static notificationsReadCreate(
        id: number,
        requestBody: NotificationRequest,
    ): CancelablePromise<Notification> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/notifications/{id}/read/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Mark all notifications as read
     * @param requestBody
     * @returns Notification
     * @throws ApiError
     */
    public static notificationsMarkAllReadCreate(
        requestBody: NotificationRequest,
    ): CancelablePromise<Notification> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/notifications/mark-all-read/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * View for notification preferences
     * @returns NotificationPreference
     * @throws ApiError
     */
    public static notificationsPreferencesRetrieve(): CancelablePromise<NotificationPreference> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/notifications/preferences/',
        });
    }
    /**
     * View for notification preferences
     * @param requestBody
     * @returns NotificationPreference
     * @throws ApiError
     */
    public static notificationsPreferencesUpdate(
        requestBody?: NotificationPreferenceRequest,
    ): CancelablePromise<NotificationPreference> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/notifications/preferences/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * View for notification preferences
     * @param requestBody
     * @returns NotificationPreference
     * @throws ApiError
     */
    public static notificationsPreferencesPartialUpdate(
        requestBody?: PatchedNotificationPreferenceRequest,
    ): CancelablePromise<NotificationPreference> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/notifications/preferences/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get unread notification count
     * @returns Notification
     * @throws ApiError
     */
    public static notificationsUnreadCountRetrieve(): CancelablePromise<Notification> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/notifications/unread-count/',
        });
    }
}
