"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
} from "lucide-react";

interface TipTapEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    className?: string;
    editable?: boolean;
}

export function TipTapEditor({
    content,
    onChange,
    placeholder = "Start typing...",
    className,
    editable = true,
}: TipTapEditorProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        editable,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: cn(
                    "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
                    "prose-headings:font-semibold",
                    "prose-p:text-foreground",
                    "prose-strong:text-foreground",
                    "prose-em:text-foreground",
                    "prose-ul:text-foreground",
                    "prose-ol:text-foreground",
                    "prose-li:text-foreground",
                    "prose-blockquote:text-muted-foreground",
                    "prose-code:text-foreground"
                ),
            },
        },
    });

    // Don't render until mounted on client
    if (!isMounted || !editor) {
        return null;
    }

    return (
        <div className={cn("border rounded-lg overflow-hidden", className)}>
            {editable && (
                <div className='border-b bg-muted/50 p-2 flex flex-wrap gap-1'>
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        disabled={
                            !editor.can().chain().focus().toggleBold().run()
                        }
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive("bold") && "bg-accent"
                        )}
                    >
                        <Bold className='h-4 w-4' />
                    </Button>
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        disabled={
                            !editor.can().chain().focus().toggleItalic().run()
                        }
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive("italic") && "bg-accent"
                        )}
                    >
                        <Italic className='h-4 w-4' />
                    </Button>
                    <div className='w-px h-6 bg-border mx-1' />
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive("bulletList") && "bg-accent"
                        )}
                    >
                        <List className='h-4 w-4' />
                    </Button>
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive("orderedList") && "bg-accent"
                        )}
                    >
                        <ListOrdered className='h-4 w-4' />
                    </Button>
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() =>
                            editor.chain().focus().toggleBlockquote().run()
                        }
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive("blockquote") && "bg-accent"
                        )}
                    >
                        <Quote className='h-4 w-4' />
                    </Button>
                    <div className='w-px h-6 bg-border mx-1' />
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}
                        className='h-8 w-8 p-0'
                    >
                        <Undo className='h-4 w-4' />
                    </Button>
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().chain().focus().redo().run()}
                        className='h-8 w-8 p-0'
                    >
                        <Redo className='h-4 w-4' />
                    </Button>
                </div>
            )}
            <EditorContent editor={editor} />
        </div>
    );
}
