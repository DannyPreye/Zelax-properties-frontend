"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PropertiesService } from "@/lib/api/services/PropertiesService";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Plus, Trash2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AvailabilityManagementProps {
    propertyId: number;
}

const availabilitySchema = z.object({
    date: z.string().min(1, "Date is required"),
    is_available: z.boolean(),
    price_override: z.string().optional(),
});

type AvailabilityFormData = z.infer<typeof availabilitySchema>;

export function AvailabilityManagement({
    propertyId,
}: AvailabilityManagementProps) {
    const queryClient = useQueryClient();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [availabilityToDelete, setAvailabilityToDelete] = useState<
        number | null
    >(null);

    const { data: availabilities, isLoading } = useQuery({
        queryKey: ["property-availability", propertyId],
        queryFn: () => PropertiesService.propertiesAvailabilityList(propertyId),
    });

    const form = useForm<AvailabilityFormData>({
        resolver: zodResolver(availabilitySchema),
        defaultValues: {
            date: "",
            is_available: true,
            price_override: "",
        },
    });

    const createMutation = useMutation({
        mutationFn: (data: AvailabilityFormData) =>
            PropertiesService.propertiesAvailabilityCreate(propertyId, {
                date: data.date,
                is_available: data.is_available,
                price_override: data.price_override || undefined,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["property-availability", propertyId],
            });
            toast.success("Availability added successfully");
            setDialogOpen(false);
            form.reset();
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.detail ||
                    error?.message ||
                    "Failed to add availability"
            );
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (availabilityId: number) =>
            PropertiesService.propertiesAvailabilityDestroy(
                availabilityId,
                propertyId
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["property-availability", propertyId],
            });
            toast.success("Availability deleted successfully");
            setDeleteDialogOpen(false);
            setAvailabilityToDelete(null);
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.detail ||
                    error?.message ||
                    "Failed to delete availability"
            );
        },
    });

    const onSubmit = (data: AvailabilityFormData) => {
        createMutation.mutate(data);
    };

    const handleDelete = (id: number) => {
        setAvailabilityToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (availabilityToDelete) {
            deleteMutation.mutate(availabilityToDelete);
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Availability Calendar</CardTitle>
                    <CardDescription>
                        Manage when your property is available
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Skeleton className='h-64 w-full' />
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle>Availability Calendar</CardTitle>
                            <CardDescription>
                                Manage when your property is available
                            </CardDescription>
                        </div>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className='mr-2 h-4 w-4' />
                                    Add Availability
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Availability</DialogTitle>
                                    <DialogDescription>
                                        Set availability dates for your property
                                    </DialogDescription>
                                </DialogHeader>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className='space-y-4'
                                    >
                                        <FormField
                                            control={form.control}
                                            name='date'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='date'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='is_available'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                                    <div className='space-y-0.5'>
                                                        <FormLabel className='text-base'>
                                                            Available
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Is this date
                                                            available for
                                                            booking?
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <input
                                                            type='checkbox'
                                                            checked={
                                                                field.value
                                                            }
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            className='h-4 w-4'
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='price_override'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Price Override
                                                        (optional)
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='text'
                                                            placeholder='100.00'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Override the base price
                                                        for this date
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button
                                                type='button'
                                                variant='outline'
                                                onClick={() =>
                                                    setDialogOpen(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type='submit'
                                                disabled={
                                                    createMutation.isPending
                                                }
                                            >
                                                {createMutation.isPending ? (
                                                    <>
                                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                        Adding...
                                                    </>
                                                ) : (
                                                    "Add Availability"
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    {availabilities?.results &&
                    availabilities.results.length > 0 ? (
                        <div className='space-y-2'>
                            {availabilities.results.map((availability) => (
                                <div
                                    key={availability.id}
                                    className='flex items-center justify-between p-4 border rounded-lg'
                                >
                                    <div className='flex items-center gap-4'>
                                        <Calendar className='h-4 w-4 text-muted-foreground' />
                                        <div>
                                            <p className='font-medium'>
                                                {new Date(
                                                    availability.date
                                                ).toLocaleDateString()}
                                            </p>
                                            {availability.price_override && (
                                                <p className='text-sm text-muted-foreground'>
                                                    Price: $
                                                    {
                                                        availability.price_override
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Badge
                                            variant={
                                                availability.is_available
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {availability.is_available
                                                ? "Available"
                                                : "Unavailable"}
                                        </Badge>
                                        <Button
                                            variant='ghost'
                                            size='icon'
                                            onClick={() =>
                                                handleDelete(availability.id)
                                            }
                                        >
                                            <Trash2 className='h-4 w-4' />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-12 border-2 border-dashed rounded-lg'>
                            <Calendar className='h-12 w-12 mx-auto text-muted-foreground mb-4' />
                            <p className='text-muted-foreground mb-4'>
                                No availability dates set yet
                            </p>
                            <Button onClick={() => setDialogOpen(true)}>
                                <Plus className='mr-2 h-4 w-4' />
                                Add Availability
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete Availability?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This availability
                            entry will be permanently deleted.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
