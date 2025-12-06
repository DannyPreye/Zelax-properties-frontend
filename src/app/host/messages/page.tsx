"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessagesService } from "@/lib/api/services/MessagesService";
import { ThreadList } from "@/components/messages/thread-list";
import { ThreadDetailSheet } from "@/components/messages/thread-detail-sheet";
import { ThreadDetailView } from "@/components/messages/thread-detail-view";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function MessagesPage() {
    const [selectedThreadId, setSelectedThreadId] = useState<number | null>(
        null
    );
    const [sheetOpen, setSheetOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Fetch threads
    const {
        data: threadsData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["message-threads"],
        queryFn: () =>
            MessagesService.messagesThreadsList(undefined, 1, undefined),
    });

    const handleThreadSelect = (threadId: number) => {
        setSelectedThreadId(threadId);
        if (isMobile) {
            setSheetOpen(true);
        }
    };

    const handleSheetClose = () => {
        setSheetOpen(false);
        // Don't clear selectedThreadId on mobile to maintain state
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="p-6 border-b">
                <h1 className="text-3xl font-bold">Messages</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your conversations with guests
                </p>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {isLoading ? (
                    <div className="flex-1 p-6">
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex gap-3">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                ) : error ? (
                    <div className="flex-1 flex items-center justify-center p-6">
                        <Card>
                            <CardContent className="p-8 text-center">
                                <p className="text-destructive mb-4">
                                    Failed to load conversations
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
                ) : !threadsData?.results || threadsData.results.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center p-6">
                        <Card>
                            <CardContent className="p-12 text-center">
                                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <h2 className="text-xl font-semibold mb-2">
                                    No conversations yet
                                </h2>
                                <p className="text-muted-foreground">
                                    Start a conversation from a booking to
                                    communicate with guests
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <>
                        {/* Desktop: Split view */}
                        {!isMobile && (
                            <div className="flex flex-1 overflow-hidden">
                                <div className="w-96 shrink-0">
                                    <ThreadList
                                        threads={threadsData.results}
                                        selectedThreadId={selectedThreadId}
                                        onThreadSelect={handleThreadSelect}
                                        isLoading={isLoading}
                                    />
                                </div>
                                <div className="flex-1 border-l">
                                    {selectedThreadId ? (
                                        <ThreadDetailView threadId={selectedThreadId} />
                                    ) : (
                                        <div className="flex items-center justify-center h-full p-6">
                                            <Card>
                                                <CardContent className="p-12 text-center">
                                                    <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                                    <h2 className="text-xl font-semibold mb-2">
                                                        Select a conversation
                                                    </h2>
                                                    <p className="text-muted-foreground">
                                                        Choose a conversation
                                                        from the list to view
                                                        messages
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Mobile: List view with Sheet */}
                        {isMobile && (
                            <div className="flex-1">
                                <ThreadList
                                    threads={threadsData.results}
                                    selectedThreadId={selectedThreadId}
                                    onThreadSelect={handleThreadSelect}
                                    isLoading={isLoading}
                                />
                                <ThreadDetailSheet
                                    threadId={selectedThreadId}
                                    open={sheetOpen}
                                    onOpenChange={handleSheetClose}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

