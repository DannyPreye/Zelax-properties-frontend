"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingsService } from "@/lib/api/services/BookingsService";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { Plus, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { BookingCard } from "@/components/bookings/booking-card";
import { CreateBookingDialog } from "@/components/bookings/create-booking-dialog";
import { BookingDetailDialog } from "@/components/bookings/booking-detail-dialog";
import { BookingStatusEnum } from "@/lib/api/models/BookingStatusEnum";
import type { Booking } from "@/lib/api/models/Booking";

interface BookingsManagementProps {
    propertyId: number;
    maxGuests: number;
}

export function BookingsManagement({
    propertyId,
    maxGuests,
}: BookingsManagementProps) {
    const queryClient = useQueryClient();
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
        null
    );
    const [statusFilter, setStatusFilter] = useState<
        "all" | BookingStatusEnum
    >("all");
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [bookingToAction, setBookingToAction] = useState<Booking | null>(
        null
    );

    const { data: bookingsData, isLoading } = useQuery({
        queryKey: ["property-bookings", propertyId],
        queryFn: () => BookingsService.bookingsList(),
    });

    const confirmMutation = useMutation({
        mutationFn: (booking: Booking) =>
            BookingsService.bookingsConfirmCreate(booking.id, {
                check_in: booking.check_in,
                check_out: booking.check_out,
                guest_count: booking.guest_count,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["property-bookings", propertyId],
            });
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            toast.success("Booking confirmed successfully");
            setConfirmDialogOpen(false);
            setBookingToAction(null);
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
        mutationFn: (booking: Booking) =>
            BookingsService.bookingsCancelCreate(booking.id, {
                check_in: booking.check_in,
                check_out: booking.check_out,
                guest_count: booking.guest_count,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["property-bookings", propertyId],
            });
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            toast.success("Booking cancelled successfully");
            setCancelDialogOpen(false);
            setBookingToAction(null);
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.detail ||
                error?.message ||
                "Failed to cancel booking";
            toast.error(errorMessage);
        },
    });

    // Filter bookings by property ID and status
    const filteredBookings =
        bookingsData?.results?.filter((booking) => {
            const matchesProperty =
                booking.property_obj.id === propertyId;
            const matchesStatus =
                statusFilter === "all" || booking.status === statusFilter;
            return matchesProperty && matchesStatus;
        }) || [];

    const handleViewDetails = (bookingId: number) => {
        setSelectedBookingId(bookingId);
        setDetailDialogOpen(true);
    };

    const handleConfirm = (bookingId: number) => {
        const booking = filteredBookings.find((b) => b.id === bookingId);
        if (booking) {
            setBookingToAction(booking);
            setConfirmDialogOpen(true);
        }
    };

    const handleCancel = (bookingId: number) => {
        const booking = filteredBookings.find((b) => b.id === bookingId);
        if (booking) {
            setBookingToAction(booking);
            setCancelDialogOpen(true);
        }
    };

    const handleConfirmAction = () => {
        if (bookingToAction) {
            confirmMutation.mutate(bookingToAction);
        }
    };

    const handleCancelAction = () => {
        if (bookingToAction) {
            cancelMutation.mutate(bookingToAction);
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Bookings</CardTitle>
                    <CardDescription>
                        Manage bookings for this property
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-48 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Bookings</CardTitle>
                            <CardDescription>
                                Manage bookings for this property
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Select
                                value={statusFilter}
                                onValueChange={(value) =>
                                    setStatusFilter(
                                        value as "all" | BookingStatusEnum
                                    )
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value={BookingStatusEnum.PENDING}>
                                        Pending
                                    </SelectItem>
                                    <SelectItem value={BookingStatusEnum.CONFIRMED}>
                                        Confirmed
                                    </SelectItem>
                                    <SelectItem value={BookingStatusEnum.CANCELLED}>
                                        Cancelled
                                    </SelectItem>
                                    <SelectItem value={BookingStatusEnum.COMPLETED}>
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={() => setCreateDialogOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Booking
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {filteredBookings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredBookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onViewDetails={handleViewDetails}
                                    onConfirm={handleConfirm}
                                    onCancel={handleCancel}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed rounded-lg">
                            <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-lg font-medium mb-2">
                                No bookings found
                            </p>
                            <p className="text-muted-foreground mb-4">
                                {statusFilter === "all"
                                    ? "Create your first booking to get started."
                                    : `No bookings with status "${statusFilter}".`}
                            </p>
                            <Button onClick={() => setCreateDialogOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Booking
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <CreateBookingDialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
                propertyId={propertyId}
                maxGuests={maxGuests}
            />

            {selectedBookingId && (
                <BookingDetailDialog
                    open={detailDialogOpen}
                    onOpenChange={setDetailDialogOpen}
                    bookingId={selectedBookingId}
                    propertyId={propertyId}
                />
            )}

            {/* Confirm Booking Dialog */}
            <AlertDialog
                open={confirmDialogOpen}
                onOpenChange={setConfirmDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Booking?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to confirm this booking? This
                            action will notify the guest and mark the booking as
                            confirmed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmAction}
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
                            Are you sure you want to cancel this booking? This
                            action cannot be undone and will notify the guest.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCancelAction}
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

