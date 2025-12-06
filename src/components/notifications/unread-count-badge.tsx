"use client";

import { useQuery } from "@tanstack/react-query";
import { NotificationsService } from "@/lib/api/services/NotificationsService";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UnreadCountBadgeProps {
    className?: string;
}

export function UnreadCountBadge({ className }: UnreadCountBadgeProps) {
    // Use the notifications list to calculate unread count
    // The unread count API endpoint returns a Notification object which doesn't contain count
    const { data: notificationsData } = useQuery({
        queryKey: ["notifications"],
        queryFn: () =>
            NotificationsService.notificationsList(undefined, 1, undefined),
        refetchInterval: 60000, // Refetch every minute
    });

    const unreadCount =
        notificationsData?.results.filter((n) => !n.is_read).length || 0;

    if (unreadCount === 0) return null;

    return (
        <Badge
            variant="destructive"
            className={cn("h-5 min-w-5 px-1.5 text-xs", className)}
        >
            {unreadCount > 99 ? "99+" : unreadCount}
        </Badge>
    );
}

