import { useState, useEffect, useCallback, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import type { LatLngExpression } from "leaflet";
import { reverseGeocode } from "@/lib/utils/geocoding";
import { getCurrentLocation } from "@/lib/utils/geolocation";
import {
    getCountryCoordinates,
} from "@/lib/utils/countries";
import type { PropertyFormData } from "@/lib/validations/property";

export function useLocationPicker(form: UseFormReturn<PropertyFormData>) {
    const [isGeocoding, setIsGeocoding] = useState(false);
    const [mapCenter, setMapCenter] = useState<LatLngExpression | undefined>(undefined);
    const [mapZoom, setMapZoom] = useState<number | undefined>(undefined);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const geocodeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const latitude = form.watch("latitude");
    const longitude = form.watch("longitude");
    const selectedCountry = form.watch("country");

    // Handle location change from map
    const handleLocationChange = useCallback(
        async (lat: string, lng: string) => {
            form.setValue("latitude", lat);
            form.setValue("longitude", lng);

            // Debounce reverse geocoding to respect rate limits
            if (geocodeTimeoutRef.current) {
                clearTimeout(geocodeTimeoutRef.current);
            }

            geocodeTimeoutRef.current = setTimeout(async () => {
                const latNum = parseFloat(lat);
                const lngNum = parseFloat(lng);

                if (
                    !isNaN(latNum) &&
                    !isNaN(lngNum) &&
                    latNum !== 0 &&
                    lngNum !== 0
                ) {
                    setIsGeocoding(true);
                    try {
                        const result = await reverseGeocode(latNum, lngNum);
                        form.setValue("address", result.address);
                        form.setValue("city", result.city);
                        form.setValue("country", result.country);
                    } catch (err) {
                        console.error("Reverse geocoding failed:", err);
                    } finally {
                        setIsGeocoding(false);
                    }
                }
            }, 1000);
        },
        [form]
    );

    // Get user's current location on mount
    useEffect(() => {
        const getUserLocation = async () => {
            if (!latitude && !longitude && !mapCenter) {
                setIsGettingLocation(true);
                try {
                    const position = await getCurrentLocation();
                    setMapCenter([position.latitude, position.longitude]);
                    setMapZoom(13);
                    form.setValue("latitude", position.latitude.toFixed(6));
                    form.setValue("longitude", position.longitude.toFixed(6));
                } catch (err) {
                    console.log("Could not get user location:", err);
                } finally {
                    setIsGettingLocation(false);
                }
            }
        };

        getUserLocation();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Handle country selection to center map
    const handleCountryChange = useCallback(async (countryName: string) => {
        if (!countryName) {
            return;
        }

        const coordinates = await getCountryCoordinates(countryName);
        if (coordinates) {
            setMapCenter([coordinates.lat, coordinates.lng]);
            setMapZoom(6);
        }
    }, []);

    // Watch country field for changes
    useEffect(() => {
        if (selectedCountry) {
            handleCountryChange(selectedCountry);
        }
    }, [selectedCountry, handleCountryChange]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (geocodeTimeoutRef.current) {
                clearTimeout(geocodeTimeoutRef.current);
            }
        };
    }, []);

    return {
        latitude,
        longitude,
        mapCenter,
        mapZoom,
        isGeocoding,
        isGettingLocation,
        handleLocationChange,
    };
}

