"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingsService } from "@/lib/api/services/BookingsService";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    CheckCircle2,
    XCircle,
    Calendar,
    Users,
    DollarSign,
    Loader2,
    MapPin,
    User,
} from "lucide-react";
import { BookingStatusEnum } from "@/lib/api/models/BookingStatusEnum";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

interface BookingDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    bookingId: number;
    propertyId: number;
}

export function BookingDetailDialog({
    open,
    onOpenChange,
    bookingId,
    propertyId,
}: BookingDetailDialogProps) {
    const queryClient = useQueryClient();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

    const { data: booking, isLoading } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => BookingsService.bookingsRetrieve(bookingId),
        enabled: open && !!bookingId,
    });

    const confirmMutation = useMutation({
        mutationFn: () =>
            BookingsService.bookingsConfirmCreate(bookingId, {
                check_in: booking?.check_in || "",
                check_out: booking?.check_out || "",
                guest_count: booking?.guest_count || 1,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["property-bookings", propertyId],
            });
            queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            toast.success("Booking confirmed successfully");
            setConfirmDialogOpen(false);
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.detail ||
                error?.message ||
                "Failed to confirm booking";
            toast.error(errorMessage);
        },
    });

    const cancelMutation = useMutation({
        mutationFn: () =>
            BookingsService.bookingsCancelCreate(bookingId, {
                check_in: booking?.check_in || "",
                check_out: booking?.check_out || "",
                guest_count: booking?.guest_count || 1,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["property-bookings", propertyId],
            });
            queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            toast.success("Booking cancelled successfully");
            setCancelDialogOpen(false);
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.detail ||
                error?.message ||
                "Failed to cancel booking";
            toast.error(errorMessage);
        },
    });

    const getStatusBadgeVariant = (status: BookingStatusEnum) => {
        switch (status) {
            case BookingStatusEnum.PENDING:
                return "secondary";
            case BookingStatusEnum.CONFIRMED:
                return "default";
            case BookingStatusEnum.CANCELLED:
                return "destructive";
            case BookingStatusEnum.COMPLETED:
                return "outline";
            default:
                return "secondary";
        }
    };

    const getStatusLabel = (status: BookingStatusEnum) => {
        switch (status) {
            case BookingStatusEnum.PENDING:
                return "Pending";
            case BookingStatusEnum.CONFIRMED:
                return "Confirmed";
            case BookingStatusEnum.CANCELLED:
                return "Cancelled";
            case BookingStatusEnum.COMPLETED:
                return "Completed";
            default:
                return "Unknown";
        }
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    const formatCurrency = (amount: string) => {
        const num = parseFloat(amount);
        return isNaN(num) ? amount : `$${num.toFixed(2)}`;
    };

    const handleConfirm = () => {
        if (booking) {
            confirmMutation.mutate();
        }
    };

    const handleCancel = () => {
        if (booking) {
            cancelMutation.mutate();
        }
    };

    if (isLoading) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Booking Details</DialogTitle>
                        <DialogDescription>Loading booking information...</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (!booking) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Booking Not Found</DialogTitle>
                        <DialogDescription>
                            The booking you're looking for doesn't exist.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <DialogTitle>Booking Details</DialogTitle>
                                <DialogDescription>
                                    View and manage booking information
                                </DialogDescription>
                            </div>
                            <Badge variant={getStatusBadgeVariant(booking.status)}>
                                {getStatusLabel(booking.status)}
                            </Badge>
                        </div>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Guest Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Guest Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Name:
                                        </span>
                                        <p className="font-medium">
                                            {booking.guest.first_name}{" "}
                                            {booking.guest.last_name}
                                        </p>
                                    </div>
                                    {booking.guest.username && (
                                        <div>
                                            <span className="text-sm text-muted-foreground">
                                                Username:
                                            </span>
                                            <p className="font-medium">
                                                {booking.guest.username}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Property Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Property Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Property:
                                        </span>
                                        <p className="font-medium">
                                            {booking.property_obj.title}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Location:
                                        </span>
                                        <p className="font-medium">
                                            {booking.property_obj.city},{" "}
                                            {booking.property_obj.country}
                                        </p>
                                    </div>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="mt-2"
                                    >
                                        <Link
                                            href={`/host/properties/${booking.property_obj.id}`}
                                        >
                                            View Property
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Booking Dates */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Booking Dates
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Check-in:
                                        </span>
                                        <p className="font-medium">
                                            {formatDate(booking.check_in)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Check-out:
                                        </span>
                                        <p className="font-medium">
                                            {formatDate(booking.check_out)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Duration:
                                        </span>
                                        <p className="font-medium">
                                            {booking.nights} night(s)
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Guests:
                                        </span>
                                        <p className="font-medium flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            {booking.guest_count} guest(s)
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pricing Breakdown */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    Pricing Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Base Price:
                                    </span>
                                    <span className="font-medium">
                                        {formatCurrency(booking.base_price)}
                                    </span>
                                </div>
                                {booking.cleaning_fee && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Cleaning Fee:
                                        </span>
                                        <span className="font-medium">
                                            {formatCurrency(booking.cleaning_fee)}
                                        </span>
                                    </div>
                                )}
                                {booking.service_fee && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Service Fee:
                                        </span>
                                        <span className="font-medium">
                                            {formatCurrency(booking.service_fee)}
                                        </span>
                                    </div>
                                )}
                                {booking.security_deposit && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Security Deposit:
                                        </span>
                                        <span className="font-medium">
                                            {formatCurrency(booking.security_deposit)}
                                        </span>
                                    </div>
                                )}
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-lg">
                                            Total Price:
                                        </span>
                                        <span className="text-xl font-bold text-primary">
                                            {formatCurrency(booking.total_price)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Cancellation Policy */}
                        {booking.cancellation_policy && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Cancellation Policy</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Badge variant="outline">
                                        {booking.cancellation_policy
                                            .charAt(0)
                                            .toUpperCase() +
                                            booking.cancellation_policy.slice(1)}
                                    </Badge>
                                </CardContent>
                            </Card>
                        )}

                        {/* Cancellation Info */}
                        {booking.status === BookingStatusEnum.CANCELLED && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Cancellation Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {booking.cancelled_at && (
                                        <div>
                                            <span className="text-sm text-muted-foreground">
                                                Cancelled At:
                                            </span>
                                            <p className="font-medium">
                                                {formatDate(booking.cancelled_at)}
                                            </p>
                                        </div>
                                    )}
                                    {booking.cancellation_refund && (
                                        <div>
                                            <span className="text-sm text-muted-foreground">
                                                Refund Amount:
                                            </span>
                                            <p className="font-medium text-green-600">
                                                {formatCurrency(booking.cancellation_refund)}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div>
                                    <span className="text-sm text-muted-foreground">
                                        Created:
                                    </span>
                                    <p className="font-medium">
                                        {formatDate(booking.created_at)}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm text-muted-foreground">
                                        Last Updated:
                                    </span>
                                    <p className="font-medium">
                                        {formatDate(booking.updated_at)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-4 border-t">
                            {booking.status === BookingStatusEnum.PENDING && (
                                <Button
                                    onClick={() => setConfirmDialogOpen(true)}
                                    disabled={confirmMutation.isPending}
                                    className="flex-1"
                                >
                                    {confirmMutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Confirming...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            Confirm Booking
                                        </>
                                    )}
                                </Button>
                            )}
                            {(booking.status === BookingStatusEnum.PENDING ||
                                booking.status === BookingStatusEnum.CONFIRMED) && (
                                <Button
                                    variant="destructive"
                                    onClick={() => setCancelDialogOpen(true)}
                                    disabled={cancelMutation.isPending}
                                    className="flex-1"
                                >
                                    {cancelMutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Cancelling...
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Cancel Booking
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Confirm Booking Dialog */}
            <AlertDialog
                open={confirmDialogOpen}
                onOpenChange={setConfirmDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Booking?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to confirm this booking? This action
                            will notify the guest and mark the booking as confirmed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirm}
                            disabled={confirmMutation.isPending}
                        >
                            {confirmMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Confirming...
                                </>
                            ) : (
                                "Confirm"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Cancel Booking Dialog */}
            <AlertDialog
                open={cancelDialogOpen}
                onOpenChange={setCancelDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to cancel this booking? This action
                            cannot be undone and will notify the guest.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCancel}
                            disabled={cancelMutation.isPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {cancelMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Cancelling...
                                </>
                            ) : (
                                "Cancel Booking"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

