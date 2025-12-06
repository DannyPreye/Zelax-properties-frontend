"use client";

import dynamic from "next/dynamic";
import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import type { PropertyFormData } from "@/lib/validations/property";

const TipTapEditor = dynamic(
    () =>
        import("@/components/editor/tiptap-editor").then((mod) => ({
            default: mod.TipTapEditor,
        })),
    {
        ssr: false,
        loading: () => (
            <div className='h-[200px] w-full rounded-lg border flex items-center justify-center bg-muted/50'>
                <Loader2 className='h-6 w-6 animate-spin text-primary' />
            </div>
        ),
    }
);

interface Step2PropertyDetailsProps {
    form: UseFormReturn<PropertyFormData>;
}

export function Step2PropertyDetails({ form }: Step2PropertyDetailsProps) {
    return (
        <div className='space-y-6'>
            <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <TipTapEditor
                                content={field.value || ""}
                                onChange={field.onChange}
                                placeholder='Describe your property in detail...'
                            />
                        </FormControl>
                        <FormDescription>
                            Provide a detailed description of your property
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <FormField
                    control={form.control}
                    name='bedrooms'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bedrooms</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    min='0'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='beds'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Beds</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    min='0'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='bathrooms'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bathrooms</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    placeholder='1.5'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='max_guests'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Max Guests</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    min='1'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseInt(e.target.value) || 1
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}

