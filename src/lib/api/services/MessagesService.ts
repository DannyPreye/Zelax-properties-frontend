/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { MessageCreate } from '../models/MessageCreate';
import type { MessageCreateRequest } from '../models/MessageCreateRequest';
import type { MessageThread } from '../models/MessageThread';
import type { MessageThreadCreate } from '../models/MessageThreadCreate';
import type { MessageThreadCreateRequest } from '../models/MessageThreadCreateRequest';
import type { PaginatedMessageList } from '../models/PaginatedMessageList';
import type { PaginatedMessageThreadList } from '../models/PaginatedMessageThreadList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MessagesService {
    /**
     * ViewSet for message thread operations
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedMessageThreadList
     * @throws ApiError
     */
    public static messagesThreadsList(
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedMessageThreadList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/messages/threads/',
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * ViewSet for message thread operations
     * @param requestBody
     * @returns MessageThreadCreate
     * @throws ApiError
     */
    public static messagesThreadsCreate(
        requestBody: MessageThreadCreateRequest,
    ): CancelablePromise<MessageThreadCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/messages/threads/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for message thread operations
     * @param id A unique integer value identifying this message thread.
     * @returns MessageThread
     * @throws ApiError
     */
    public static messagesThreadsRetrieve(
        id: number,
    ): CancelablePromise<MessageThread> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/messages/threads/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for message thread operations
     * @param id A unique integer value identifying this message thread.
     * @returns MessageThread
     * @throws ApiError
     */
    public static messagesThreadsUpdate(
        id: number,
    ): CancelablePromise<MessageThread> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/messages/threads/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for message thread operations
     * @param id A unique integer value identifying this message thread.
     * @returns MessageThread
     * @throws ApiError
     */
    public static messagesThreadsPartialUpdate(
        id: number,
    ): CancelablePromise<MessageThread> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/messages/threads/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for message thread operations
     * @param id A unique integer value identifying this message thread.
     * @returns void
     * @throws ApiError
     */
    public static messagesThreadsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/messages/threads/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get or create messages in a thread
     * @param id A unique integer value identifying this message thread.
     * @returns MessageThread
     * @throws ApiError
     */
    public static messagesThreadsMessagesRetrieve(
        id: number,
    ): CancelablePromise<MessageThread> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/messages/threads/{id}/messages/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get or create messages in a thread
     * @param id A unique integer value identifying this message thread.
     * @returns MessageThread
     * @throws ApiError
     */
    public static messagesThreadsMessagesCreate(
        id: number,
    ): CancelablePromise<MessageThread> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/messages/threads/{id}/messages/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for message operations
     * @param threadId
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param search A search term.
     * @returns PaginatedMessageList
     * @throws ApiError
     */
    public static messagesThreadsMessagesList(
        threadId: number,
        ordering?: string,
        page?: number,
        search?: string,
    ): CancelablePromise<PaginatedMessageList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/messages/threads/{thread_id}/messages/',
            path: {
                'thread_id': threadId,
            },
            query: {
                'ordering': ordering,
                'page': page,
                'search': search,
            },
        });
    }
    /**
     * ViewSet for message operations
     * @param threadId
     * @param requestBody
     * @returns MessageCreate
     * @throws ApiError
     */
    public static messagesThreadsMessagesCreate2(
        threadId: number,
        requestBody: MessageCreateRequest,
    ): CancelablePromise<MessageCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/messages/threads/{thread_id}/messages/',
            path: {
                'thread_id': threadId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for message operations
     * @param id
     * @param threadId
     * @returns Message
     * @throws ApiError
     */
    public static messagesThreadsMessagesRetrieve2(
        id: number,
        threadId: number,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/messages/threads/{thread_id}/messages/{id}/',
            path: {
                'id': id,
                'thread_id': threadId,
            },
        });
    }
}
