"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationsService } from "@/lib/api/services/NotificationsService";
import { NotificationList } from "@/components/notifications/notification-list";
import { NotificationDetailDialog } from "@/components/notifications/notification-detail-dialog";
import { PreferencesDialog } from "@/components/notifications/preferences-dialog";
import { UnreadCountBadge } from "@/components/notifications/unread-count-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Settings, CheckCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { TypeEnum } from "@/lib/api/models/TypeEnum";

export default function NotificationsPage() {
    const queryClient = useQueryClient();
    const [selectedNotificationId, setSelectedNotificationId] = useState<
        number | null
    >(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [preferencesDialogOpen, setPreferencesDialogOpen] = useState(false);

    // Fetch notifications
    const {
        data: notificationsData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["notifications"],
        queryFn: () =>
            NotificationsService.notificationsList(undefined, 1, undefined),
    });

    // Calculate unread count from notifications list
    // The unread count API endpoint returns a Notification object which doesn't contain count

    // Mark all as read mutation
    const markAllAsReadMutation = useMutation({
        mutationFn: () =>
            NotificationsService.notificationsMarkAllReadCreate({
                type: TypeEnum.MESSAGE,
                title: "",
                message: "",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({
                queryKey: ["notification-unread-count"],
            });
            toast.success("All notifications marked as read");
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.detail ||
                    error?.message ||
                    "Failed to mark all notifications as read"
            );
        },
    });

    // Mark single notification as read mutation
    const markAsReadMutation = useMutation({
        mutationFn: (notificationId: number) => {
            const notification = notificationsData?.results.find(
                (n) => n.id === notificationId
            );
            return NotificationsService.notificationsReadCreate(
                notificationId,
                {
                    type: notification?.type || TypeEnum.MESSAGE,
                    title: notification?.title || "",
                    message: notification?.message || "",
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({
                queryKey: ["notification-unread-count"],
            });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.detail ||
                    error?.message ||
                    "Failed to mark notification as read"
            );
        },
    });

    const handleNotificationSelect = (notificationId: number) => {
        setSelectedNotificationId(notificationId);
        setDetailDialogOpen(true);
    };

    const handleMarkAsRead = (notificationId: number) => {
        markAsReadMutation.mutate(notificationId);
    };

    const unreadCount =
        notificationsData?.results.filter((n) => !n.is_read).length || 0;

    const hasUnreadNotifications = unreadCount > 0;

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">Notifications</h1>
                            {hasUnreadNotifications && (
                                <UnreadCountBadge />
                            )}
                        </div>
                        <p className="text-muted-foreground">
                            Stay updated with your property and booking
                            activities
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {hasUnreadNotifications && (
                            <Button
                                variant="outline"
                                onClick={() => markAllAsReadMutation.mutate()}
                                disabled={markAllAsReadMutation.isPending}
                            >
                                {markAllAsReadMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Marking...
                                    </>
                                ) : (
                                    <>
                                        <CheckCheck className="mr-2 h-4 w-4" />
                                        Mark All as Read
                                    </>
                                )}
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            onClick={() => setPreferencesDialogOpen(true)}
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            Preferences
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {isLoading ? (
                    <div className="p-6">
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex gap-3">
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-full" />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-full p-6">
                        <Card>
                            <CardContent className="p-8 text-center">
                                <p className="text-destructive mb-4">
                                    Failed to load notifications
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-primary hover:underline"
                                >
                                    Try again
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                ) : !notificationsData?.results ||
                  notificationsData.results.length === 0 ? (
                    <div className="flex items-center justify-center h-full p-6">
                        <Card>
                            <CardContent className="p-12 text-center">
                                <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <h2 className="text-xl font-semibold mb-2">
                                    No notifications yet
                                </h2>
                                <p className="text-muted-foreground">
                                    You're all caught up! New notifications will
                                    appear here.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <NotificationList
                        notifications={notificationsData.results}
                        onNotificationSelect={handleNotificationSelect}
                        onMarkAsRead={handleMarkAsRead}
                        isLoading={isLoading}
                    />
                )}
            </div>

            <NotificationDetailDialog
                notificationId={selectedNotificationId}
                open={detailDialogOpen}
                onOpenChange={setDetailDialogOpen}
            />

            <PreferencesDialog
                open={preferencesDialogOpen}
                onOpenChange={setPreferencesDialogOpen}
            />
        </div>
    );
}

