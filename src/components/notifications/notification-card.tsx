"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils/date";
import type { Notification } from "@/lib/api/models/Notification";
import { TypeEnum } from "@/lib/api/models/TypeEnum";
import { cn } from "@/lib/utils";
import {
    CheckCircle2,
    Calendar,
    XCircle,
    MessageSquare,
    Star,
    DollarSign,
    AlertCircle,
} from "lucide-react";

interface NotificationCardProps {
    notification: Notification;
    onClick: () => void;
    onMarkAsRead?: () => void;
}

export function NotificationCard({
    notification,
    onClick,
    onMarkAsRead,
}: NotificationCardProps) {
    const isUnread = !notification.is_read;

    const getNotificationIcon = (type: TypeEnum) => {
        switch (type) {
            case TypeEnum.BOOKING_CONFIRMATION:
                return <CheckCircle2 className="h-5 w-5 text-green-600" />;
            case TypeEnum.BOOKING_REQUEST:
                return <Calendar className="h-5 w-5 text-blue-600" />;
            case TypeEnum.BOOKING_CANCELLED:
                return <XCircle className="h-5 w-5 text-red-600" />;
            case TypeEnum.MESSAGE:
                return <MessageSquare className="h-5 w-5 text-blue-600" />;
            case TypeEnum.REVIEW:
                return <Star className="h-5 w-5 text-yellow-600" />;
            case TypeEnum.PAYMENT_CONFIRMATION:
                return <DollarSign className="h-5 w-5 text-green-600" />;
            case TypeEnum.PAYMENT_FAILED:
                return <AlertCircle className="h-5 w-5 text-red-600" />;
            case TypeEnum.PROPERTY_APPROVED:
                return <CheckCircle2 className="h-5 w-5 text-green-600" />;
            case TypeEnum.PROPERTY_REJECTED:
                return <XCircle className="h-5 w-5 text-red-600" />;
            default:
                return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
        }
    };

    const getNotificationTypeLabel = (type: TypeEnum) => {
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

    const getNotificationTypeVariant = (type: TypeEnum) => {
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

    const handleClick = () => {
        if (isUnread && onMarkAsRead) {
            onMarkAsRead();
        }
        onClick();
    };

    return (
        <Card
            className={cn(
                "cursor-pointer transition-all hover:shadow-md p-4",
                isUnread &&
                    "border-l-4 border-l-primary bg-muted/30 shadow-sm"
            )}
            onClick={handleClick}
        >
            <div className="flex gap-3">
                <div className="shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3
                                    className={cn(
                                        "font-semibold text-sm",
                                        isUnread && "font-bold"
                                    )}
                                >
                                    {notification.title}
                                </h3>
                                <Badge
                                    variant={getNotificationTypeVariant(
                                        notification.type
                                    )}
                                    className="text-xs"
                                >
                                    {getNotificationTypeLabel(notification.type)}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatRelativeTime(notification.created_at)}
                            </span>
                            {isUnread && (
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                        </div>
                    </div>

                    <p
                        className={cn(
                            "text-sm line-clamp-2",
                            isUnread
                                ? "text-foreground"
                                : "text-muted-foreground"
                        )}
                    >
                        {notification.message}
                    </p>
                </div>
            </div>
        </Card>
    );
}

