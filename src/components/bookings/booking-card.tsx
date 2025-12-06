"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Calendar, Users } from "lucide-react";
import type { Booking } from "@/lib/api/models/Booking";
import { BookingStatusEnum } from "@/lib/api/models/BookingStatusEnum";

interface BookingCardProps {
    booking: Booking;
    onViewDetails: (bookingId: number) => void;
    onConfirm?: (bookingId: number) => void;
    onCancel?: (bookingId: number) => void;
}

export function BookingCard({
    booking,
    onViewDetails,
    onConfirm,
    onCancel,
}: BookingCardProps) {
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
                month: "short",
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

    return (
        <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onViewDetails(booking.id)}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">
                                {booking.guest.first_name} {booking.guest.last_name}
                            </h3>
                            <Badge variant={getStatusBadgeVariant(booking.status)}>
                                {getStatusLabel(booking.status)}
                            </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {formatDate(booking.check_in)} -{" "}
                                    {formatDate(booking.check_out)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{booking.guest_count} guest(s)</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">
                            {formatCurrency(booking.total_price)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {booking.nights} night(s)
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    {booking.status === BookingStatusEnum.PENDING && onConfirm && (
                        <Button
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onConfirm(booking.id);
                            }}
                            className="flex-1"
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Confirm
                        </Button>
                    )}
                    {(booking.status === BookingStatusEnum.PENDING ||
                        booking.status === BookingStatusEnum.CONFIRMED) &&
                        onCancel && (
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCancel(booking.id);
                                }}
                                className="flex-1"
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        )}
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(booking.id);
                        }}
                    >
                        View Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

