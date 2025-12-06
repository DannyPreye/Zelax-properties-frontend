"use client";

import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationsService } from "@/lib/api/services/NotificationsService";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRelativeTime } from "@/lib/utils/date";
import { TypeEnum } from "@/lib/api/models/TypeEnum";
import {
    CheckCircle2,
    Calendar,
    XCircle,
    MessageSquare,
    Star,
    DollarSign,
    AlertCircle,
    Loader2,
} from "lucide-react";
import Link from "next/link";

interface NotificationDetailDialogProps {
    notificationId: number | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function NotificationDetailDialog({
    notificationId,
    open,
    onOpenChange,
}: NotificationDetailDialogProps) {
    const queryClient = useQueryClient();

    // Fetch notification details
    const { data: notification, isLoading } = useQuery({
        queryKey: ["notification", notificationId],
        queryFn: () =>
            NotificationsService.notificationsRetrieve(notificationId!),
        enabled: open && !!notificationId,
    });

    // Mark as read mutation
    const markAsReadMutation = useMutation({
        mutationFn: () =>
            NotificationsService.notificationsReadCreate(notificationId!, {
                type: notification?.type || TypeEnum.MESSAGE,
                title: notification?.title || "",
                message: notification?.message || "",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notification", notificationId],
            });
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });
            queryClient.invalidateQueries({
                queryKey: ["notification-unread-count"],
            });
            toast.success("Notification marked as read");
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.detail ||
                    error?.message ||
                    "Failed to mark notification as read"
            );
        },
    });

    const getNotificationIcon = (type?: TypeEnum) => {
        if (!type) return null;
        switch (type) {
            case TypeEnum.BOOKING_CONFIRMATION:
                return <CheckCircle2 className="h-6 w-6 text-green-600" />;
            case TypeEnum.BOOKING_REQUEST:
                return <Calendar className="h-6 w-6 text-blue-600" />;
            case TypeEnum.BOOKING_CANCELLED:
                return <XCircle className="h-6 w-6 text-red-600" />;
            case TypeEnum.MESSAGE:
                return <MessageSquare className="h-6 w-6 text-blue-600" />;
            case TypeEnum.REVIEW:
                return <Star className="h-6 w-6 text-yellow-600" />;
            case TypeEnum.PAYMENT_CONFIRMATION:
                return <DollarSign className="h-6 w-6 text-green-600" />;
            case TypeEnum.PAYMENT_FAILED:
                return <AlertCircle className="h-6 w-6 text-red-600" />;
            case TypeEnum.PROPERTY_APPROVED:
                return <CheckCircle2 className="h-6 w-6 text-green-600" />;
            case TypeEnum.PROPERTY_REJECTED:
                return <XCircle className="h-6 w-6 text-red-600" />;
            default:
                return <AlertCircle className="h-6 w-6 text-muted-foreground" />;
        }
    };

    const getNotificationTypeLabel = (type?: TypeEnum) => {
        if (!type) return "Notification";
        switch (type) {
            case TypeEnum.BOOKING_CONFIRMATION:
                return "Booking Confirmed";
            case TypeEnum.BOOKING_REQUEST:
                return "Booking Request";
            case TypeEnum.BOOKING_CANCELLED:
                return "Booking Cancelled";
            case TypeEnum.MESSAGE:
                return "Message";
            case TypeEnum.REVIEW:
                return "Review";
            case TypeEnum.PAYMENT_CONFIRMATION:
                return "Payment Confirmed";
            case TypeEnum.PAYMENT_FAILED:
                return "Payment Failed";
            case TypeEnum.PROPERTY_APPROVED:
                return "Property Approved";
            case TypeEnum.PROPERTY_REJECTED:
                return "Property Rejected";
            default:
                return "Notification";
        }
    };

    const getNotificationTypeVariant = (type?: TypeEnum) => {
        if (!type) return "secondary";
        switch (type) {
            case TypeEnum.BOOKING_CONFIRMATION:
            case TypeEnum.PAYMENT_CONFIRMATION:
            case TypeEnum.PROPERTY_APPROVED:
                return "default";
            case TypeEnum.BOOKING_CANCELLED:
            case TypeEnum.PAYMENT_FAILED:
            case TypeEnum.PROPERTY_REJECTED:
                return "destructive";
            case TypeEnum.BOOKING_REQUEST:
            case TypeEnum.MESSAGE:
                return "secondary";
            case TypeEnum.REVIEW:
                return "outline";
            default:
                return "secondary";
        }
    };

    const handleMarkAsRead = () => {
        if (!notification?.is_read) {
            markAsReadMutation.mutate();
        }
    };

    // Auto-mark as read when dialog opens
    React.useEffect(() => {
        if (open && notification && !notification.is_read) {
            handleMarkAsRead();
        }
    }, [open, notification]);

    if (!notificationId) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                ) : !notification ? (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">
                            Notification not found
                        </p>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 mt-1">
                                    {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DialogTitle className="text-xl">
                                            {notification.title}
                                        </DialogTitle>
                                        <Badge
                                            variant={getNotificationTypeVariant(
                                                notification.type
                                            )}
                                        >
                                            {getNotificationTypeLabel(
                                                notification.type
                                            )}
                                        </Badge>
                                    </div>
                                    <DialogDescription>
                                        {formatRelativeTime(
                                            notification.created_at
                                        )}
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="rounded-lg border p-4 bg-muted/50">
                                <p className="text-sm whitespace-pre-wrap">
                                    {notification.message}
                                </p>
                            </div>

                            {!notification.is_read && (
                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleMarkAsRead}
                                        disabled={markAsReadMutation.isPending}
                                        variant="outline"
                                    >
                                        {markAsReadMutation.isPending ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Marking...
                                            </>
                                        ) : (
                                            "Mark as Read"
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

