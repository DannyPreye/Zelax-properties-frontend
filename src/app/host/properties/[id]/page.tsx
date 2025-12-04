"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import {
  Edit,
  Trash2,
  MoreVertical,
  MapPin,
  Bed,
  Bath,
  Users,
  DollarSign,
  Calendar,
  Image as ImageIcon,
  Loader2,
  Camera,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TipTapEditor } from "@/components/editor/tiptap-editor";
import type { PropertyDetailStatusEnum } from "@/lib/api/models/PropertyDetailStatusEnum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhotosManagement } from "@/components/properties/photos-management";
import { AvailabilityManagement } from "@/components/properties/availability-management";
import { BlockedDatesManagement } from "@/components/properties/blocked-dates-management";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const propertyId = parseInt(params.id as string);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<PropertyDetailStatusEnum | "">("");

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => PropertiesService.propertiesRetrieve(propertyId),
  });

  const deleteMutation = useMutation({
    mutationFn: () => PropertiesService.propertiesDestroy(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["host-properties"] });
      toast.success("Property deleted successfully");
      router.push("/host/properties");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ||
          error?.message ||
          "Failed to delete property"
      );
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: (status: PropertyDetailStatusEnum) =>
      PropertiesService.propertiesPartialUpdate(propertyId, {
        status,
      } as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
      toast.success("Property status updated successfully");
      setStatusDialogOpen(false);
      setNewStatus("");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ||
          error?.message ||
          "Failed to update status"
      );
    },
  });

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

  const handleStatusChange = () => {
    if (newStatus) {
      updateStatusMutation.mutate(newStatus as PropertyDetailStatusEnum);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-lg font-medium mb-2">Property not found</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/host/properties">Back to Properties</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <Badge variant={getStatusBadgeVariant(property.status)}>
              {getStatusLabel(property.status)}
            </Badge>
          </div>
          <p className="text-muted-foreground flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {property.address}, {property.city}, {property.country}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setStatusDialogOpen(true)}
              >
                Change Status
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/host/properties/${property.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteDialogOpen(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild>
            <Link href={`/host/properties/${property.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Property
            </Link>
          </Button>
        </div>
      </div>

      {property.photos && property.photos.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="relative h-96 w-full overflow-hidden rounded-t-lg">
              <Image
                src={property.photos[0].image || "/placeholder-property.jpg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            {property.photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2 p-4">
                {property.photos.slice(1, 5).map((photo, index) => (
                  <div
                    key={photo.id}
                    className="relative h-24 w-full overflow-hidden rounded-md"
                  >
                    <Image
                      src={photo.image || "/placeholder-property.jpg"}
                      alt={`${property.title} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="blocked-dates">Blocked Dates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Property Type</CardDescription>
                <CardTitle className="text-lg">
                  {property.property_type
                    ? property.property_type.charAt(0).toUpperCase() +
                      property.property_type.slice(1)
                    : "N/A"}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Base Price</CardDescription>
                <CardTitle className="text-lg flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {property.base_price}/night
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Max Guests</CardDescription>
                <CardTitle className="text-lg flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {property.max_guests}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Bedrooms</CardDescription>
                <CardTitle className="text-lg flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  {property.bedrooms}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Beds</CardDescription>
                <CardTitle className="text-lg">{property.beds}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Bathrooms</CardDescription>
                <CardTitle className="text-lg flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  {property.bathrooms}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Instant Booking</CardDescription>
                <CardTitle className="text-lg">
                  {property.instant_booking ? "Enabled" : "Disabled"}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <TipTapEditor
                content={property.description || ""}
                onChange={() => {}}
                editable={false}
              />
            </CardContent>
          </Card>

          {property.house_rules && (
            <Card>
              <CardHeader>
                <CardTitle>House Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <TipTapEditor
                  content={property.house_rules}
                  onChange={() => {}}
                  editable={false}
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Pricing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Price:</span>
                <span className="font-medium">${property.base_price}/night</span>
              </div>
              {property.cleaning_fee && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cleaning Fee:</span>
                  <span className="font-medium">${property.cleaning_fee}</span>
                </div>
              )}
              {property.service_fee && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee:</span>
                  <span className="font-medium">${property.service_fee}</span>
                </div>
              )}
              {property.min_stay && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum Stay:</span>
                  <span className="font-medium">{property.min_stay} nights</span>
                </div>
              )}
              {property.max_stay && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Maximum Stay:</span>
                  <span className="font-medium">{property.max_stay} nights</span>
                </div>
              )}
            </CardContent>
          </Card>

          {property.amenities && Object.keys(property.amenities).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(property.amenities).map(([key, value]) =>
                    value ? (
                      <Badge key={key} variant="secondary">
                        {key.replace("has_", "").replace(/_/g, " ")}
                      </Badge>
                    ) : null
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="photos">
          <PhotosManagement propertyId={propertyId} />
        </TabsContent>

        <TabsContent value="availability">
          <AvailabilityManagement propertyId={propertyId} />
        </TabsContent>

        <TabsContent value="blocked-dates">
          <BlockedDatesManagement propertyId={propertyId} />
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              property and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate()}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Property Status</AlertDialogTitle>
            <AlertDialogDescription>
              Select the new status for this property.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Select
              value={newStatus}
              onValueChange={(value) =>
                setNewStatus(value as PropertyDetailStatusEnum)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStatusChange}
              disabled={!newStatus || updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

