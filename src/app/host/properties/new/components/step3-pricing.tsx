"use client";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CancellationPolicyEnum } from "@/lib/api/models/CancellationPolicyEnum";
import type { PropertyFormData } from "@/lib/validations/property";

interface Step3PricingProps {
    form: UseFormReturn<PropertyFormData>;
}

export function Step3Pricing({ form }: Step3PricingProps) {
    return (
        <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <FormField
                    control={form.control}
                    name='base_price'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Base Price (per night)</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    placeholder='100.00'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='cleaning_fee'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cleaning Fee (optional)</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    placeholder='50.00'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='service_fee'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Service Fee (optional)</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    placeholder='25.00'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name='cancellation_policy'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cancellation Policy</FormLabel>
                        <Select
                            onValueChange={(value) =>
                                field.onChange(
                                    value as CancellationPolicyEnum
                                )
                            }
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select cancellation policy' />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Object.values(CancellationPolicyEnum).map(
                                    (policy) => (
                                        <SelectItem key={policy} value={policy}>
                                            {policy
                                                .charAt(0)
                                                .toUpperCase() + policy.slice(1)}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            Choose your cancellation policy
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                    control={form.control}
                    name='min_stay'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Minimum Stay (nights)</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    min='0'
                                    placeholder='1'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.value
                                                ? parseInt(e.target.value)
                                                : undefined
                                        )
                                    }
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='max_stay'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Maximum Stay (nights)</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    min='0'
                                    placeholder='30'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.value
                                                ? parseInt(e.target.value)
                                                : undefined
                                        )
                                    }
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name='instant_booking'
                render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className='space-y-1 leading-none'>
                            <FormLabel>Enable Instant Booking</FormLabel>
                            <FormDescription>
                                Allow guests to book without approval
                            </FormDescription>
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
}

