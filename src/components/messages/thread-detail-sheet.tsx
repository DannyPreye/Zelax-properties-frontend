"use client";

import { ThreadDetailView } from "./thread-detail-view";
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet";

interface ThreadDetailSheetProps {
    threadId: number | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ThreadDetailSheet({
    threadId,
    open,
    onOpenChange,
}: ThreadDetailSheetProps) {
    if (!threadId) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
                <ThreadDetailView threadId={threadId} />
            </SheetContent>
        </Sheet>
    );
}

