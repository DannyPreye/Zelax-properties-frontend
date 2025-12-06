"use client";

import { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PropertiesService } from "@/lib/api/services/PropertiesService";
import { toast } from "sonner";
import { FormDescription, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Camera, X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Step5PhotosProps {
    propertyId: number;
}

export function Step5Photos({ propertyId }: Step5PhotosProps) {
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState<number | null>(null);

    const { data: photos, isLoading } = useQuery({
        queryKey: ["property-photos", propertyId],
        queryFn: () => PropertiesService.propertiesPhotosList(propertyId),
    });

    const deleteMutation = useMutation({
        mutationFn: (photoId: number) =>
            PropertiesService.propertiesPhotosDestroy(photoId, propertyId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["property-photos", propertyId],
            });
            queryClient.invalidateQueries({
                queryKey: ["property", propertyId],
            });
            toast.success("Photo deleted successfully");
            setDeleteDialogOpen(false);
            setPhotoToDelete(null);
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.detail ||
                    error?.message ||
                    "Failed to delete photo"
            );
        },
    });

    const uploadMutation = useMutation({
        mutationFn: async (file: File) => {
            const blob = new Blob([file], { type: file.type });
            return PropertiesService.propertiesPhotosCreate2(propertyId, {
                image: blob,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["property-photos", propertyId],
            });
            queryClient.invalidateQueries({
                queryKey: ["property", propertyId],
            });
            toast.success("Photo uploaded successfully");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.detail ||
                    error?.message ||
                    "Failed to upload photo"
            );
        },
    });

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                uploadMutation.mutate(file);
            });
        }
    };

    const handleDelete = (photoId: number) => {
        setPhotoToDelete(photoId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (photoToDelete) {
            deleteMutation.mutate(photoToDelete);
        }
    };

    if (isLoading) {
        return (
            <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <FormLabel className='text-base'>
                            Property Photos
                        </FormLabel>
                        <FormDescription>
                            Upload photos of your property to attract guests
                        </FormDescription>
                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {[...Array(4)].map((_, i) => (
                        <Skeleton
                            key={i}
                            className='aspect-square rounded-lg'
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <FormLabel className='text-base'>
                            Property Photos
                        </FormLabel>
                        <FormDescription>
                            Upload photos of your property to attract guests.
                            You can add more photos later.
                        </FormDescription>
                    </div>
                    <div>
                        <Input
                            ref={fileInputRef}
                            type='file'
                            accept='image/*'
                            multiple
                            onChange={handleFileSelect}
                            className='hidden'
                            id='photo-upload'
                        />
                        <Button
                            type='button'
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadMutation.isPending}
                        >
                            {uploadMutation.isPending ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Camera className='mr-2 h-4 w-4' />
                                    Upload Photos
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {photos?.results && photos.results.length > 0 ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {photos.results.map((photo) => (
                            <div
                                key={photo.id}
                                className='relative group aspect-square overflow-hidden rounded-lg border'
                            >
                                <Image
                                    src={
                                        photo.image ||
                                        "/placeholder-property.jpg"
                                    }
                                    alt={`Property photo ${photo.id}`}
                                    fill
                                    className='object-cover'
                                />
                                {photo.is_primary && (
                                    <div className='absolute top-2 left-2'>
                                        <span className='bg-primary text-primary-foreground text-xs px-2 py-1 rounded'>
                                            Primary
                                        </span>
                                    </div>
                                )}
                                <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                    <Button
                                        type='button'
                                        variant='destructive'
                                        size='icon'
                                        onClick={() => handleDelete(photo.id)}
                                    >
                                        <X className='h-4 w-4' />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-12 border-2 border-dashed rounded-lg'>
                        <ImageIcon className='h-12 w-12 mx-auto text-muted-foreground mb-4' />
                        <p className='text-muted-foreground mb-4'>
                            No photos uploaded yet
                        </p>
                        <Button
                            type='button'
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className='mr-2 h-4 w-4' />
                            Upload First Photo
                        </Button>
                    </div>
                )}
            </div>

            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Photo?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This photo will be
                            permanently deleted.
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
