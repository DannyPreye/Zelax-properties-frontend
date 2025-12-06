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
import { Checkbox } from "@/components/ui/checkbox";
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

const AMENITIES = [
    { id: "has_ac", label: "Air Conditioning" },
    { id: "has_kitchen", label: "Kitchen" },
    { id: "has_parking", label: "Parking" },
    { id: "has_pool", label: "Pool" },
    { id: "has_wifi", label: "WiFi" },
];

interface Step4AmenitiesProps {
    form: UseFormReturn<PropertyFormData>;
}

export function Step4Amenities({ form }: Step4AmenitiesProps) {
    return (
        <div className='space-y-6'>
            <div>
                <FormLabel className='text-base'>Amenities</FormLabel>
                <FormDescription className='mb-4'>
                    Select the amenities available at your property
                </FormDescription>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {AMENITIES.map((amenity) => (
                        <FormField
                            key={amenity.id}
                            control={form.control}
                            name={`amenities.${amenity.id}` as any}
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                                    <FormControl>
                                        <Checkbox
                                            checked={!!field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className='font-normal'>
                                        {amenity.label}
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                    ))}
                </div>
            </div>

            <FormField
                control={form.control}
                name='house_rules'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>House Rules</FormLabel>
                        <FormControl>
                            <TipTapEditor
                                content={field.value || ""}
                                onChange={field.onChange}
                                placeholder='List your house rules...'
                            />
                        </FormControl>
                        <FormDescription>
                            Specify any rules guests should follow
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}

