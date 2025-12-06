"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PropertiesService } from "@/lib/api/services/PropertiesService";
import type { PropertyList } from "@/lib/api/models/PropertyList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    Plus,
    Search,
    MapPin,
    Bed,
    Bath,
    Users,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { PropertyDetailStatusEnum } from "@/lib/api/models/PropertyDetailStatusEnum";

export default function PropertiesPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<
        "active" | "inactive" | "under_review" | "all"
    >("all");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState<number | null>(
        null
    );

    const { data, isLoading, error } = useQuery({
        queryKey: ["host-properties", searchQuery, statusFilter],
        queryFn: () =>
            PropertiesService.propertiesList(
                undefined, // bathrooms
                undefined, // bedrooms
                undefined, // beds
                undefined, // checkIn
                undefined, // checkOut
                undefined, // city
                undefined, // country
                undefined, // hasAc
                undefined, // hasKitchen
                undefined, // hasParking
                undefined, // hasPool
                undefined, // hasWifi
                undefined, // latitude
                undefined, // longitude
                undefined, // maxPrice
                undefined, // minGuests
                undefined, // minPrice
                undefined, // ordering
                1, // page
                undefined, // propertyType
                undefined, // radiusKm
                searchQuery || undefined, // search
                statusFilter !== "all" ? statusFilter : undefined // status
            ),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => PropertiesService.propertiesDestroy(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["host-properties"] });
            toast.success("Property deleted successfully");
            setDeleteDialogOpen(false);
            setPropertyToDelete(null);
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.detail ||
                    error?.message ||
                    "Failed to delete property"
            );
        },
    });

    const handleDelete = (id: number) => {
        setPropertyToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (propertyToDelete) {
            deleteMutation.mutate(propertyToDelete);
        }
    };

    const getStatusBadgeVariant = (status?: PropertyDetailStatusEnum) => {
        switch (status) {
            case "active":
                return "default";
            case "inactive":
                return "secondary";
            case "under_review":
                return "outline";
            default:
                return "default";
        }
    };

    const getStatusLabel = (status?: PropertyDetailStatusEnum) => {
        switch (status) {
            case "active":
                return "Active";
            case "inactive":
                return "Inactive";
            case "under_review":
                return "Under Review";
            default:
                return "Unknown";
        }
    };

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold'>Properties</h1>
                    <p className='text-muted-foreground'>
                        Manage your property listings
                    </p>
                </div>
                <Button asChild>
                    <Link href='/host/properties/new'>
                        <Plus className='mr-2 h-4 w-4' />
                        Create Property
                    </Link>
                </Button>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='relative flex-1'>
                    <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                        placeholder='Search properties...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='pl-9'
                    />
                </div>
                <Select
                    value={statusFilter}
                    onValueChange={(value: any) => setStatusFilter(value)}
                >
                    <SelectTrigger className='w-full sm:w-[180px]'>
                        <SelectValue placeholder='Filter by status' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>All Status</SelectItem>
                        <SelectItem value='active'>Active</SelectItem>
                        <SelectItem value='inactive'>Inactive</SelectItem>
                        <SelectItem value='under_review'>
                            Under Review
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {isLoading ? (
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {[...Array(6)].map((_, i) => (
                        <Card key={i}>
                            <Skeleton className='h-48 w-full' />
                            <CardHeader>
                                <Skeleton className='h-6 w-3/4' />
                                <Skeleton className='h-4 w-1/2 mt-2' />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className='h-4 w-full' />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : error ? (
                <Card>
                    <CardContent className='pt-6'>
                        <div className='text-center text-destructive'>
                            Failed to load properties. Please try again.
                        </div>
                    </CardContent>
                </Card>
            ) : !data?.results || data.results.length === 0 ? (
                <Card>
                    <CardContent className='pt-6'>
                        <div className='text-center py-12'>
                            <p className='text-lg font-medium mb-2'>
                                No properties found
                            </p>
                            <p className='text-muted-foreground mb-4'>
                                {searchQuery || statusFilter !== "all"
                                    ? "Try adjusting your search or filters"
                                    : "Get started by creating your first property"}
                            </p>
                            {!searchQuery && statusFilter === "all" && (
                                <Button asChild>
                                    <Link href='/host/properties/new'>
                                        <Plus className='mr-2 h-4 w-4' />
                                        Create Property
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {data.results.map((property: PropertyList) => (
                        <Card key={property.id} className='overflow-hidden'>
                            <div className='relative h-48 w-full overflow-hidden'>
                                <Image
                                    src={
                                        property.primary_photo
                                            ? // @ts-ignore
                                              `${process.env.NEXT_PUBLIC_API_BASE_URL}${property.primary_photo?.image}`
                                            : "/placeholder-property.jpg"
                                    }
                                    alt={property.title}
                                    fill
                                    className='object-cover'
                                />
                                <div className='absolute top-2 right-2'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant='secondary'
                                                size='icon'
                                                className='h-8 w-8'
                                            >
                                                <MoreVertical className='h-4 w-4' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/host/properties/${property.id}`}
                                                >
                                                    <Eye className='mr-2 h-4 w-4' />
                                                    View
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/host/properties/${property.id}/edit`}
                                                >
                                                    <Edit className='mr-2 h-4 w-4' />
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleDelete(property.id)
                                                }
                                                className='text-destructive'
                                            >
                                                <Trash2 className='mr-2 h-4 w-4' />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <CardHeader>
                                <div className='flex items-start justify-between'>
                                    <CardTitle className='line-clamp-1'>
                                        {property.title}
                                    </CardTitle>
                                </div>
                                <CardDescription className='flex items-center gap-1'>
                                    <MapPin className='h-3 w-3' />
                                    {property.city}, {property.country}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='flex items-center gap-4 text-sm text-muted-foreground mb-4'>
                                    <div className='flex items-center gap-1'>
                                        <Bed className='h-4 w-4' />
                                        <span>{property.bedrooms}</span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Bath className='h-4 w-4' />
                                        <span>{property.bathrooms}</span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Users className='h-4 w-4' />
                                        <span>{property.max_guests}</span>
                                    </div>
                                </div>
                                <div className='text-2xl font-bold'>
                                    ${property.base_price}
                                    <span className='text-sm font-normal text-muted-foreground'>
                                        /night
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter className='flex justify-between'>
                                <Badge variant='outline'>
                                    {property.property_type}
                                </Badge>
                                <Button variant='outline' size='sm' asChild>
                                    <Link
                                        href={`/host/properties/${property.id}`}
                                    >
                                        View Details
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the property and all associated data.
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
        </div>
    );
}
