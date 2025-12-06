"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/utils/date";
import type { MessageThread } from "@/lib/api/models/MessageThread";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Calendar } from "lucide-react";

interface ThreadCardProps {
    thread: MessageThread;
    isSelected: boolean;
    onClick: () => void;
}

export function ThreadCard({ thread, isSelected, onClick }: ThreadCardProps) {
    const { user } = useAuth();

    // Get the other participant (not the current user)
    const otherParticipant = thread.participants.find(
        (p) => p.id !== user?.id
    ) || thread.participants[0];

    const unreadCount = parseInt(thread.unread_count) || 0;
    const hasUnread = unreadCount > 0;

    const participantInitials =
        otherParticipant.first_name && otherParticipant.last_name
            ? `${otherParticipant.first_name[0]}${otherParticipant.last_name[0]}`
            : otherParticipant.username[0].toUpperCase();

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        } catch {
            return "";
        }
    };

    return (
        <Card
            className={cn(
                "cursor-pointer transition-all hover:shadow-md p-4",
                isSelected && "ring-2 ring-primary shadow-md"
            )}
            onClick={onClick}
        >
            <div className="flex gap-3">
                <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage
                        src={otherParticipant.profile_photo || undefined}
                        alt={otherParticipant.full_name}
                    />
                    <AvatarFallback>
                        {participantInitials}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">
                                {otherParticipant.full_name}
                            </h3>
                            {thread.booking && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                    <Calendar className="h-3 w-3" />
                                    <span className="truncate">
                                        {thread.booking.property_obj.title}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatRelativeTime(thread.updated_at)}
                            </span>
                            {hasUnread && (
                                <Badge
                                    variant="default"
                                    className="h-5 min-w-5 px-1.5 text-xs"
                                >
                                    {unreadCount > 99 ? "99+" : unreadCount}
                                </Badge>
                            )}
                        </div>
                    </div>

                    <p
                        className={cn(
                            "text-sm truncate",
                            hasUnread
                                ? "text-foreground font-medium"
                                : "text-muted-foreground"
                        )}
                    >
                        {thread.last_message || "No messages yet"}
                    </p>
                </div>
            </div>
        </Card>
    );
}

