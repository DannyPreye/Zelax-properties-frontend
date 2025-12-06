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
import { ThreadCard } from "./thread-card";
import type { MessageThread } from "@/lib/api/models/MessageThread";
import { Search, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ThreadListProps {
    threads: MessageThread[];
    selectedThreadId: number | null;
    onThreadSelect: (threadId: number) => void;
    isLoading?: boolean;
}

export function ThreadList({
    threads,
    selectedThreadId,
    onThreadSelect,
    isLoading,
}: ThreadListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<"all" | "unread">("all");

    // Filter threads based on search and filter
    const filteredThreads = threads.filter((thread) => {
        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const participantMatch = thread.participants.some(
                (p) =>
                    p.full_name.toLowerCase().includes(query) ||
                    p.username.toLowerCase().includes(query)
            );
            const bookingMatch = thread.booking?.property_obj.title
                .toLowerCase()
                .includes(query);
            const messageMatch = thread.last_message
                .toLowerCase()
                .includes(query);

            if (!participantMatch && !bookingMatch && !messageMatch) {
                return false;
            }
        }

        // Unread filter
        if (filter === "unread") {
            const unreadCount = parseInt(thread.unread_count) || 0;
            if (unreadCount === 0) {
                return false;
            }
        }

        return true;
    });

    return (
        <div className="flex flex-col h-full border-r">
            {/* Header with search and filter */}
            <div className="p-4 border-b space-y-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={filter} onValueChange={(value) => setFilter(value as "all" | "unread")}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Conversations</SelectItem>
                        <SelectItem value="unread">Unread Only</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Threads list */}
            <ScrollArea className="flex-1">
                <div className="p-2 space-y-2">
                    {isLoading ? (
                        // Loading skeletons
                        Array.from({ length: 5 }).map((_, i) => (
                            <Card key={i} className="p-4">
                                <div className="flex gap-3">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : filteredThreads.length === 0 ? (
                        // Empty state
                        <Card className="p-8">
                            <CardContent className="flex flex-col items-center justify-center text-center">
                                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="font-semibold mb-2">
                                    {searchQuery || filter === "unread"
                                        ? "No conversations found"
                                        : "No conversations yet"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {searchQuery || filter === "unread"
                                        ? "Try adjusting your search or filter"
                                        : "Start a conversation from a booking"}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        // Thread cards
                        filteredThreads.map((thread) => (
                            <ThreadCard
                                key={thread.id}
                                thread={thread}
                                isSelected={selectedThreadId === thread.id}
                                onClick={() => onThreadSelect(thread.id)}
                            />
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}

