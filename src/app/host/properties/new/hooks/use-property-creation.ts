import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PropertiesService } from "@/lib/api/services/PropertiesService";
import type { PropertyFormData } from "@/lib/validations/property";

export function usePropertyCreation()
{
    const router = useRouter();

    const createMutation = useMutation({
        mutationFn: async (data: PropertyFormData) =>
        {
            const response = await PropertiesService.propertiesCreate({
                title: data.title,
                description: data.description,
                property_type: data.property_type,
                address: data.address,
                city: data.city,
                country: data.country,
                latitude: data.latitude,
                longitude: data.longitude,
                amenities: data.amenities || {},
                house_rules: data.house_rules || undefined,
                cancellation_policy: data.cancellation_policy,
                base_price: data.base_price,
                cleaning_fee: data.cleaning_fee || undefined,
                service_fee: data.service_fee || undefined,
                max_guests: data.max_guests,
                bedrooms: data.bedrooms,
                beds: data.beds,
                bathrooms: data.bathrooms,
                instant_booking: data.instant_booking,
                min_stay: data.min_stay,
                max_stay: data.max_stay,
            });

            // The API might return the ID in the response even if TypeScript doesn't know about it
            // Check if response has an id property
            const responseWithId = response as any;
            if (responseWithId.id) {
                return { ...response, id: responseWithId.id };
            }

            // If no ID in response, fetch the most recent property
            // This is a fallback - ideally the API should return the ID
            const properties = await PropertiesService.propertiesList(
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
                undefined, // search
                undefined // status
            );
            if (properties.results && properties.results.length > 0) {
                const latestProperty = properties.results[ 0 ];
                return { ...response, id: latestProperty.id };
            }

            return response;
        },
        onSuccess: (property) =>
        {
            toast.success("Property created successfully");
            return property;
        },
        onError: (error: any) =>
        {
            const errorMessage =
                error?.response?.data?.detail ||
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create property. Please try again.";
            toast.error(errorMessage);
        },
    });

    return {
        createMutation,
    };
}

