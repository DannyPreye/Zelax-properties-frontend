"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationCard } from "./notification-card";
import type { Notification } from "@/lib/api/models/Notification";
import { TypeEnum } from "@/lib/api/models/TypeEnum";
import { Search, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface NotificationListProps {
    notifications: Notification[];
    onNotificationSelect: (notificationId: number) => void;
    onMarkAsRead: (notificationId: number) => void;
    isLoading?: boolean;
}

export function NotificationList({
    notifications,
    onNotificationSelect,
    onMarkAsRead,
    isLoading,
}: NotificationListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<TypeEnum | "all">("all");
    const [readFilter, setReadFilter] = useState<"all" | "unread">("all");

    // Filter notifications based on search and filters
    const filteredNotifications = notifications.filter((notification) => {
        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const titleMatch = notification.title.toLowerCase().includes(query);
            const messageMatch = notification.message
                .toLowerCase()
                .includes(query);

            if (!titleMatch && !messageMatch) {
                return false;
            }
        }

        // Type filter
        if (typeFilter !== "all" && notification.type !== typeFilter) {
            return false;
        }

        // Read filter
        if (readFilter === "unread" && notification.is_read) {
            return false;
        }

        return true;
    });

    // Group notifications by date
    const groupedNotifications = filteredNotifications.reduce(
        (groups, notification) => {
            const date = new Date(notification.created_at);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const thisWeek = new Date(today);
            thisWeek.setDate(thisWeek.getDate() - 7);

            let groupKey: string;
            if (date >= today) {
                groupKey = "Today";
            } else if (date >= yesterday) {
                groupKey = "Yesterday";
            } else if (date >= thisWeek) {
                groupKey = "This Week";
            } else {
                groupKey = "Older";
            }

            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(notification);
            return groups;
        },
        {} as Record<string, Notification[]>
    );

    return (
        <div className="flex flex-col h-full">
            {/* Header with search and filters */}
            <div className="p-4 border-b space-y-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search notifications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex gap-2">
                    <Select
                        value={typeFilter}
                        onValueChange={(value) =>
                            setTypeFilter(value as TypeEnum | "all")
                        }
                    >
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value={TypeEnum.BOOKING_REQUEST}>
                                Booking Requests
                            </SelectItem>
                            <SelectItem value={TypeEnum.BOOKING_CONFIRMATION}>
                                Booking Confirmations
                            </SelectItem>
                            <SelectItem value={TypeEnum.BOOKING_CANCELLED}>
                                Booking Cancellations
                            </SelectItem>
                            <SelectItem value={TypeEnum.MESSAGE}>Messages</SelectItem>
                            <SelectItem value={TypeEnum.REVIEW}>Reviews</SelectItem>
                            <SelectItem value={TypeEnum.PAYMENT_CONFIRMATION}>
                                Payment Confirmations
                            </SelectItem>
                            <SelectItem value={TypeEnum.PAYMENT_FAILED}>
                                Payment Failed
                            </SelectItem>
                            <SelectItem value={TypeEnum.PROPERTY_APPROVED}>
                                Property Approved
                            </SelectItem>
                            <SelectItem value={TypeEnum.PROPERTY_REJECTED}>
                                Property Rejected
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={readFilter}
                        onValueChange={(value) =>
                            setReadFilter(value as "all" | "unread")
                        }
                    >
                        <SelectTrigger className="flex-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="unread">Unread Only</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Notifications list */}
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                    {isLoading ? (
                        // Loading skeletons
                        Array.from({ length: 5 }).map((_, i) => (
                            <Card key={i} className="p-4">
                                <div className="flex gap-3">
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-full" />
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : filteredNotifications.length === 0 ? (
                        // Empty state
                        <Card className="p-8">
                            <CardContent className="flex flex-col items-center justify-center text-center">
                                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="font-semibold mb-2">
                                    {searchQuery || typeFilter !== "all" || readFilter !== "all"
                                        ? "No notifications found"
                                        : "No notifications yet"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {searchQuery || typeFilter !== "all" || readFilter !== "all"
                                        ? "Try adjusting your search or filters"
                                        : "You're all caught up!"}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        // Grouped notification cards
                        Object.entries(groupedNotifications).map(
                            ([groupKey, groupNotifications]) => (
                                <div key={groupKey} className="space-y-2">
                                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        {groupKey}
                                    </h3>
                                    <div className="space-y-2">
                                        {groupNotifications.map((notification) => (
                                            <NotificationCard
                                                key={notification.id}
                                                notification={notification}
                                                onClick={() =>
                                                    onNotificationSelect(
                                                        notification.id
                                                    )
                                                }
                                                onMarkAsRead={() =>
                                                    onMarkAsRead(notification.id)
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        )
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}

