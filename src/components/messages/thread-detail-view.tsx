"use client";

import { useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessagesService } from "@/lib/api/services/MessagesService";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageBubble } from "./message-bubble";
import { MessageInput } from "./message-input";
import { useAuth } from "@/hooks/use-auth";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils/date";
import { Card, CardContent } from "@/components/ui/card";

interface ThreadDetailViewProps {
    threadId: number;
}

export function ThreadDetailView({ threadId }: ThreadDetailViewProps) {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Fetch thread details
    const { data: thread, isLoading: isLoadingThread } = useQuery({
        queryKey: ["message-thread", threadId],
        queryFn: () => MessagesService.messagesThreadsRetrieve(threadId),
    });

    // Fetch messages
    const {
        data: messagesData,
        isLoading: isLoadingMessages,
        refetch: refetchMessages,
    } = useQuery({
        queryKey: ["thread-messages", threadId],
        queryFn: () =>
            MessagesService.messagesThreadsMessagesList(threadId, undefined, 1),
        refetchInterval: 30000, // Refetch every 30 seconds
    });

    // Send message mutation
    const sendMessageMutation = useMutation({
        mutationFn: (content: string) =>
            MessagesService.messagesThreadsMessagesCreate2(threadId, {
                content,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["thread-messages", threadId],
            });
            queryClient.invalidateQueries({
                queryKey: ["message-thread", threadId],
            });
            queryClient.invalidateQueries({
                queryKey: ["message-threads"],
            });
            // Scroll to bottom after sending
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.detail ||
                    error?.message ||
                    "Failed to send message"
            );
        },
    });

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesData?.results && messagesData.results.length > 0) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messagesData]);

    // Refetch messages when component mounts
    useEffect(() => {
        refetchMessages();
    }, [refetchMessages]);

    if (isLoadingThread) {
        return (
            <div className="flex flex-col h-full">
                <div className="p-6 border-b space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-8 w-3/4" />
                </div>
                <div className="flex-1 p-6">
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        );
    }

    if (!thread) {
        return (
            <div className="flex items-center justify-center h-full p-6">
                <Card>
                    <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">
                            Thread not found
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Get the other participant
    const otherParticipant =
        thread.participants.find((p) => p.id !== user?.id) ||
        thread.participants[0];

    const participantInitials =
        otherParticipant?.first_name && otherParticipant?.last_name
            ? `${otherParticipant.first_name[0]}${otherParticipant.last_name[0]}`
            : otherParticipant?.username[0].toUpperCase() || "?";

    const handleSendMessage = async (content: string) => {
        await sendMessageMutation.mutateAsync(content);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b">
                <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage
                            src={otherParticipant?.profile_photo || undefined}
                            alt={otherParticipant?.full_name || ""}
                        />
                        <AvatarFallback>{participantInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold">
                            {otherParticipant?.full_name || "Unknown User"}
                        </h2>
                        {thread.booking && (
                            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {formatDate(thread.booking.check_in)} -{" "}
                                        {formatDate(thread.booking.check_out)}
                                    </span>
                                </div>
                                <Link
                                    href={`/host/properties/${thread.booking.property_obj.id}`}
                                    className="flex items-center gap-2 text-primary hover:underline"
                                >
                                    <MapPin className="h-4 w-4" />
                                    <span className="truncate">
                                        {thread.booking.property_obj.title}
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="p-6">
                    {isLoadingMessages ? (
                        <div className="space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex gap-3">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-1/4" />
                                        <Skeleton className="h-16 w-3/4 rounded-2xl" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : !messagesData?.results ||
                      messagesData.results.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <p className="text-muted-foreground">
                                No messages yet. Start the conversation!
                            </p>
                        </div>
                    ) : (
                        <div>
                            {messagesData.results.map((message) => (
                                <MessageBubble
                                    key={message.id}
                                    message={message}
                                    isOwnMessage={message.sender.id === user?.id}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Message Input */}
            <MessageInput
                threadId={threadId}
                onSend={handleSendMessage}
                disabled={sendMessageMutation.isPending}
            />
        </div>
    );
}

