"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
    threadId: number;
    onSend: (content: string) => Promise<void>;
    disabled?: boolean;
}

export function MessageInput({ threadId, onSend, disabled }: MessageInputProps) {
    const [content, setContent] = useState("");
    const [isSending, setIsSending] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Auto-focus on mount
        textareaRef.current?.focus();
    }, [threadId]);

    const handleSend = async () => {
        const trimmedContent = content.trim();
        if (!trimmedContent || isSending || disabled) return;

        setIsSending(true);
        try {
            await onSend(trimmedContent);
            setContent("");
            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        } catch (error) {
            // Error handling is done in parent component
        } finally {
            setIsSending(false);
            textareaRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        // Auto-resize textarea
        e.target.style.height = "auto";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
    };

    return (
        <div className="border-t p-4 bg-background">
            <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                    <Textarea
                        ref={textareaRef}
                        value={content}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        disabled={disabled || isSending}
                        className="min-h-[60px] max-h-[200px] resize-none pr-12"
                        rows={1}
                    />
                </div>
                <Button
                    onClick={handleSend}
                    disabled={!content.trim() || isSending || disabled}
                    size="icon"
                    className="shrink-0 h-[60px] w-[60px]"
                >
                    {isSending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Send className="h-5 w-5" />
                    )}
                </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 px-1">
                Press Enter to send, Shift+Enter for new line
            </p>
        </div>
    );
}

