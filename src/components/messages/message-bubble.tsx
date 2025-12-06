"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/utils/date";
import type { Message } from "@/lib/api/models/Message";
import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
    message: Message;
    isOwnMessage: boolean;
}

export function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
    const senderInitials = message.sender.first_name && message.sender.last_name
        ? `${message.sender.first_name[0]}${message.sender.last_name[0]}`
        : message.sender.username[0].toUpperCase();

    return (
        <div
            className={cn(
                "flex gap-3 mb-4",
                isOwnMessage && "flex-row-reverse"
            )}
        >
            {!isOwnMessage && (
                <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage
                        src={message.sender.profile_photo || undefined}
                        alt={message.sender.full_name}
                    />
                    <AvatarFallback className="text-xs">
                        {senderInitials}
                    </AvatarFallback>
                </Avatar>
            )}

            <div
                className={cn(
                    "flex flex-col max-w-[70%]",
                    isOwnMessage && "items-end"
                )}
            >
                {!isOwnMessage && (
                    <span className="text-xs text-muted-foreground mb-1 px-1">
                        {message.sender.full_name}
                    </span>
                )}

                <div
                    className={cn(
                        "rounded-2xl px-4 py-2 break-words",
                        isOwnMessage
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                    )}
                >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                <div
                    className={cn(
                        "flex items-center gap-1 mt-1 px-1",
                        isOwnMessage && "flex-row-reverse"
                    )}
                >
                    <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(message.created_at)}
                    </span>
                    {isOwnMessage && (
                        <div className="text-muted-foreground">
                            {message.is_read ? (
                                <CheckCheck className="h-3 w-3 text-primary" />
                            ) : (
                                <Check className="h-3 w-3" />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

