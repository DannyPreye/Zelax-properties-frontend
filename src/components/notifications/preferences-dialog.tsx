"use client";

import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationsService } from "@/lib/api/services/NotificationsService";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PreferencesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PreferencesDialog({
    open,
    onOpenChange,
}: PreferencesDialogProps) {
    const queryClient = useQueryClient();

    // Fetch preferences
    const { data: preferences, isLoading } = useQuery({
        queryKey: ["notification-preferences"],
        queryFn: () => NotificationsService.notificationsPreferencesRetrieve(),
        enabled: open,
    });

    // Update preferences mutation
    const updatePreferencesMutation = useMutation({
        mutationFn: (data: {
            email_enabled?: boolean;
            push_enabled?: boolean;
            booking_notifications?: boolean;
            message_notifications?: boolean;
            review_notifications?: boolean;
            payment_notifications?: boolean;
            property_notifications?: boolean;
        }) =>
            NotificationsService.notificationsPreferencesPartialUpdate(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notification-preferences"],
            });
            toast.success("Notification preferences updated");
            onOpenChange(false);
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.detail ||
                    error?.message ||
                    "Failed to update preferences"
            );
        },
    });

    const [localPreferences, setLocalPreferences] = React.useState({
        email_enabled: false,
        push_enabled: false,
        booking_notifications: false,
        message_notifications: false,
        review_notifications: false,
        payment_notifications: false,
        property_notifications: false,
    });

    React.useEffect(() => {
        if (preferences) {
            setLocalPreferences({
                email_enabled: preferences.email_enabled ?? false,
                push_enabled: preferences.push_enabled ?? false,
                booking_notifications: preferences.booking_notifications ?? false,
                message_notifications: preferences.message_notifications ?? false,
                review_notifications: preferences.review_notifications ?? false,
                payment_notifications: preferences.payment_notifications ?? false,
                property_notifications: preferences.property_notifications ?? false,
            });
        }
    }, [preferences]);

    const handleSave = () => {
        updatePreferencesMutation.mutate(localPreferences);
    };

    const togglePreference = (key: keyof typeof localPreferences) => {
        setLocalPreferences((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Notification Preferences</DialogTitle>
                    <DialogDescription>
                        Manage how you receive notifications
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Delivery Methods */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Delivery Methods
                                </CardTitle>
                                <CardDescription>
                                    Choose how you want to receive notifications
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="email-enabled">
                                            Email Notifications
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive notifications via email
                                        </p>
                                    </div>
                                    <Checkbox
                                        id="email-enabled"
                                        checked={localPreferences.email_enabled}
                                        onCheckedChange={() =>
                                            togglePreference("email_enabled")
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="push-enabled">
                                            Push Notifications
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive push notifications in your
                                            browser
                                        </p>
                                    </div>
                                    <Checkbox
                                        id="push-enabled"
                                        checked={localPreferences.push_enabled}
                                        onCheckedChange={() =>
                                            togglePreference("push_enabled")
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notification Types */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Notification Types
                                </CardTitle>
                                <CardDescription>
                                    Select which types of notifications you want
                                    to receive
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="booking-notifications">
                                            Booking Notifications
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            New bookings, confirmations, and
                                            cancellations
                                        </p>
                                    </div>
                                    <Checkbox
                                        id="booking-notifications"
                                        checked={
                                            localPreferences.booking_notifications
                                        }
                                        onCheckedChange={() =>
                                            togglePreference(
                                                "booking_notifications"
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="message-notifications">
                                            Message Notifications
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            New messages from guests
                                        </p>
                                    </div>
                                    <Checkbox
                                        id="message-notifications"
                                        checked={
                                            localPreferences.message_notifications
                                        }
                                        onCheckedChange={() =>
                                            togglePreference(
                                                "message_notifications"
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="review-notifications">
                                            Review Notifications
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            New reviews and ratings
                                        </p>
                                    </div>
                                    <Checkbox
                                        id="review-notifications"
                                        checked={
                                            localPreferences.review_notifications
                                        }
                                        onCheckedChange={() =>
                                            togglePreference(
                                                "review_notifications"
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="payment-notifications">
                                            Payment Notifications
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Payment confirmations and failures
                                        </p>
                                    </div>
                                    <Checkbox
                                        id="payment-notifications"
                                        checked={
                                            localPreferences.payment_notifications
                                        }
                                        onCheckedChange={() =>
                                            togglePreference(
                                                "payment_notifications"
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="property-notifications">
                                            Property Notifications
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Property approval and rejection
                                            updates
                                        </p>
                                    </div>
                                    <Checkbox
                                        id="property-notifications"
                                        checked={
                                            localPreferences.property_notifications
                                        }
                                        onCheckedChange={() =>
                                            togglePreference(
                                                "property_notifications"
                                            )
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={updatePreferencesMutation.isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={updatePreferencesMutation.isPending}
                    >
                        {updatePreferencesMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Preferences"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

