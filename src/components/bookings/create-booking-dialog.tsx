"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingsService } from "@/lib/api/services/BookingsService";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Calculator } from "lucide-react";

const bookingSchema = z
    .object({
        check_in: z.string().min(1, "Check-in date is required"),
        check_out: z.string().min(1, "Check-out date is required"),
        guest_count: z.number().min(1, "Guest count must be at least 1"),
    })
    .refine(
        (data) => {
            if (!data.check_in || !data.check_out) return true;
            return new Date(data.check_out) > new Date(data.check_in);
        },
        {
            message: "Check-out date must be after check-in date",
            path: ["check_out"],
        }
    );

interface CreateBookingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    propertyId: number;
    maxGuests: number;
}

export function CreateBookingDialog({
    open,
    onOpenChange,
    propertyId,
    maxGuests,
}: CreateBookingDialogProps) {
    const queryClient = useQueryClient();
    const [priceCalculation, setPriceCalculation] = useState<any>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const calculationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const form = useForm({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            check_in: "",
            check_out: "",
            guest_count: 1,
        },
    });

    const checkIn = form.watch("check_in");
    const checkOut = form.watch("check_out");
    const guestCount = form.watch("guest_count");

    // Calculate price when dates/guests change
    useEffect(() => {
        if (checkIn && checkOut && guestCount && open) {
            // Clear previous timeout
            if (calculationTimeoutRef.current) {
                clearTimeout(calculationTimeoutRef.current);
            }

            // Debounce calculation
            calculationTimeoutRef.current = setTimeout(() => {
                calculatePrice();
            }, 500);

            return () => {
                if (calculationTimeoutRef.current) {
                    clearTimeout(calculationTimeoutRef.current);
                }
            };
        } else {
            setPriceCalculation(null);
        }
    }, [checkIn, checkOut, guestCount, open]);

    const calculatePrice = async () => {
        if (!checkIn || !checkOut || !guestCount) return;

        setIsCalculating(true);
        try {
            const result = await BookingsService.bookingsCalculatePriceCreate({
                property_id: propertyId,
                check_in: checkIn,
                check_out: checkOut,
                guest_count: guestCount,
            });
            setPriceCalculation(result);
        } catch (error: any) {
            console.error("Price calculation failed:", error);
            const errorMessage =
                error?.response?.data?.detail ||
                error?.message ||
                "Failed to calculate price";
            toast.error(errorMessage);
            setPriceCalculation(null);
        } finally {
            setIsCalculating(false);
        }
    };

    const createMutation = useMutation({
        mutationFn: (data: any) =>
            BookingsService.bookingsCreate({
                property_obj: propertyId,
                check_in: data.check_in,
                check_out: data.check_out,
                guest_count: data.guest_count,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["property-bookings", propertyId],
            });
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            toast.success("Booking created successfully");
            form.reset();
            setPriceCalculation(null);
            onOpenChange(false);
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.detail ||
                error?.message ||
                "Failed to create booking";
            toast.error(errorMessage);
        },
    });

    const onSubmit = (data: any) => {
        createMutation.mutate(data);
    };

    const handleClose = () => {
        form.reset();
        setPriceCalculation(null);
        onOpenChange(false);
    };

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const formatCurrency = (amount: string | number) => {
        const num = typeof amount === "string" ? parseFloat(amount) : amount;
        return isNaN(num) ? "$0.00" : `$${num.toFixed(2)}`;
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Booking</DialogTitle>
                    <DialogDescription>
                        Create a booking for this property. The price will be
                        calculated automatically.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="check_in"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Check-in Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="check_out"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Check-out Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                                min={
                                                    checkIn ||
                                                    new Date().toISOString().split('T')[0]
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="guest_count"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Guests</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={maxGuests}
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    parseInt(e.target.value) || 1
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Maximum {maxGuests} guests allowed
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {checkIn && checkOut && (
                            <div className="text-sm text-muted-foreground">
                                <Calculator className="inline h-4 w-4 mr-1" />
                                {calculateNights()} night(s)
                            </div>
                        )}

                        {isCalculating && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Calculating price...
                            </div>
                        )}

                        {priceCalculation && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Booking Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Duration:
                                        </span>
                                        <span className="font-medium">
                                            {calculateNights()} night(s)
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Guests:
                                        </span>
                                        <span className="font-medium">
                                            {guestCount} guest(s)
                                        </span>
                                    </div>
                                    <div className="border-t pt-2 mt-2">
                                        <div className="text-sm text-muted-foreground">
                                            Price will be calculated and displayed after
                                            booking creation.
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    createMutation.isPending ||
                                    isCalculating
                                }
                            >
                                {createMutation.isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Create Booking"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

