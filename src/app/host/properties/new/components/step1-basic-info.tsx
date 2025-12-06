"use client";

import dynamic from "next/dynamic";
import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PropertyTypeEnum } from "@/lib/api/models/PropertyTypeEnum";
import { Loader2 } from "lucide-react";
import type { PropertyFormData } from "@/lib/validations/property";
import type { Country } from "@/lib/utils/countries";
import type { LatLngExpression } from "leaflet";

const LocationPicker = dynamic(
    () =>
        import("@/components/properties/location-picker").then((mod) => ({
            default: mod.LocationPicker,
        })),
    {
        ssr: false,
        loading: () => (
            <div className='h-[400px] w-full rounded-lg border flex items-center justify-center bg-muted/50'>
                <Loader2 className='h-6 w-6 animate-spin text-primary' />
            </div>
        ),
    }
);

interface Step1BasicInfoProps {
    form: UseFormReturn<PropertyFormData>;
    countries?: Country[];
    isLoadingCountries: boolean;
    latitude: string;
    longitude: string;
    mapCenter?: LatLngExpression;
    mapZoom?: number;
    isGeocoding: boolean;
    isGettingLocation: boolean;
    onLocationChange: (lat: string, lng: string) => void;
}

export function Step1BasicInfo({
    form,
    countries,
    isLoadingCountries,
    latitude,
    longitude,
    mapCenter,
    mapZoom,
    isGeocoding,
    isGettingLocation,
    onLocationChange,
}: Step1BasicInfoProps) {
    return (
        <div className='space-y-6'>
            <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Property Title</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='Beautiful beachfront villa'
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Choose a descriptive title for your property
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name='property_type'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select
                            onValueChange={(value) =>
                                field.onChange(value as PropertyTypeEnum)
                            }
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select property type' />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Object.values(PropertyTypeEnum).map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type.charAt(0).toUpperCase() +
                                            type.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder='123 Main Street' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder='New York' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                            onValueChange={(value) => {
                                field.onChange(value);
                            }}
                            value={field.value}
                            disabled={isLoadingCountries}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select a country' />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className='max-h-[300px]'>
                                {isLoadingCountries ? (
                                    <div className='p-2 text-sm text-muted-foreground'>
                                        Loading countries...
                                    </div>
                                ) : countries ? (
                                    countries.map((country) => (
                                        <SelectItem
                                            key={country.cca2}
                                            value={country.name.common}
                                        >
                                            {country.name.common}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className='p-2 text-sm text-muted-foreground'>
                                        Failed to load countries
                                    </div>
                                )}
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            Select a country to center the map on that location
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormItem>
                <FormLabel>Location on Map</FormLabel>
                <FormControl>
                    <div className='relative'>
                        {isGettingLocation && (
                            <div className='absolute top-2 left-2 z-50 bg-background/80 backdrop-blur-sm rounded-md p-2 flex items-center gap-2'>
                                <Loader2 className='h-4 w-4 animate-spin text-primary' />
                                <span className='text-sm text-muted-foreground'>
                                    Getting your location...
                                </span>
                            </div>
                        )}
                        <LocationPicker
                            latitude={latitude || ""}
                            longitude={longitude || ""}
                            onLocationChange={onLocationChange}
                            center={mapCenter}
                            zoom={mapZoom}
                        />
                        {isGeocoding && (
                            <div className='absolute top-2 right-2 z-50 bg-background/80 backdrop-blur-sm rounded-md p-2 flex items-center gap-2'>
                                <Loader2 className='h-4 w-4 animate-spin text-primary' />
                                <span className='text-sm text-muted-foreground'>
                                    Finding address...
                                </span>
                            </div>
                        )}
                    </div>
                </FormControl>
                <FormDescription>
                    {isGettingLocation
                        ? "Getting your current location..."
                        : "Click on the map to select your property location or drag the marker to adjust. The address fields above will be automatically filled."}
                </FormDescription>
            </FormItem>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                    control={form.control}
                    name='latitude'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    placeholder='40.7128'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Geographic latitude coordinate
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='longitude'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    placeholder='-74.0060'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Geographic longitude coordinate
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}

