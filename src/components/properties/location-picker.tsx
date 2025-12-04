"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import { mapTileLayer, mapAttribution } from "@/lib/map-config";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Next.js
if (typeof window !== "undefined") {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
}

interface LocationPickerProps {
    latitude: string;
    longitude: string;
    onLocationChange: (lat: string, lng: string) => void;
    onAddressChange?: (address: {
        address: string;
        city: string;
        country: string;
    }) => void;
    center?: LatLngExpression;
    zoom?: number;
}

// Component to handle map click events
function MapClickHandler({
    onMapClick,
}: {
    onMapClick: (lat: number, lng: number) => void;
}) {
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            onMapClick(lat, lng);
        },
    });
    return null;
}

// Component to update map view when coordinates change externally
function MapViewUpdater({
    lat,
    lng,
    position,
}: {
    lat: number;
    lng: number;
    position: LatLngExpression | null;
}) {
    const map = useMap();
    const prevPositionRef = useRef<LatLngExpression | null>(null);

    useEffect(() => {
        if (
            position &&
            !isNaN(lat) &&
            !isNaN(lng) &&
            lat !== 0 &&
            lng !== 0
        ) {
            const currentPos = Array.isArray(position)
                ? position
                : [position.lat, position.lng];
            const prevPos = prevPositionRef.current
                ? Array.isArray(prevPositionRef.current)
                    ? prevPositionRef.current
                    : [prevPositionRef.current.lat, prevPositionRef.current.lng]
                : null;

            // Only update if position actually changed
            if (
                !prevPos ||
                Math.abs(currentPos[0] - prevPos[0]) > 0.0001 ||
                Math.abs(currentPos[1] - prevPos[1]) > 0.0001
            ) {
                map.setView([lat, lng], map.getZoom());
                prevPositionRef.current = position;
            }
        }
    }, [lat, lng, position, map]);

    return null;
}

export function LocationPicker({
    latitude,
    longitude,
    onLocationChange,
    onAddressChange,
    center,
    zoom,
}: LocationPickerProps) {
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUpdatingFromExternal, setIsUpdatingFromExternal] = useState(false);
    const markerRef = useRef<L.Marker>(null);

    // Update position when props change (e.g., manual lat/lng input or center prop)
    useEffect(() => {
        // If center prop is provided and different from current position, update
        if (center && !isDragging) {
            const centerArray = Array.isArray(center)
                ? center
                : [center.lat, center.lng];
            const currentPos = position
                ? Array.isArray(position)
                    ? position
                    : [position.lat, position.lng]
                : null;

            if (
                !currentPos ||
                Math.abs(centerArray[0] - currentPos[0]) > 0.0001 ||
                Math.abs(centerArray[1] - currentPos[1]) > 0.0001
            ) {
                setIsUpdatingFromExternal(true);
                setPosition(center as LatLngExpression);
                setTimeout(() => setIsUpdatingFromExternal(false), 100);
            }
        } else {
            const lat = parseFloat(latitude);
            const lng = parseFloat(longitude);

            if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
                // Only update if not currently dragging to avoid conflicts
                if (!isDragging) {
                    setIsUpdatingFromExternal(true);
                    setPosition([lat, lng]);
                    // Reset flag after a short delay
                    setTimeout(() => setIsUpdatingFromExternal(false), 100);
                }
            } else if (!position) {
                // Default to world center if no coordinates provided and no position set
                setPosition([20, 0]);
            }
        }
    }, [latitude, longitude, center, isDragging, position]);

    // Handle map click
    const handleMapClick = (lat: number, lng: number) => {
        if (!isDragging && !isUpdatingFromExternal) {
            setPosition([lat, lng]);
            onLocationChange(lat.toFixed(6), lng.toFixed(6));
        }
    };

    // Handle marker drag end
    const handleMarkerDragEnd = () => {
        setIsDragging(false);
        const marker = markerRef.current;
        if (marker) {
            const { lat, lng } = marker.getLatLng();
            setPosition([lat, lng]);
            onLocationChange(lat.toFixed(6), lng.toFixed(6));
        }
    };

    // Handle marker drag start
    const handleMarkerDragStart = () => {
        setIsDragging(true);
    };

    // Get initial center and zoom
    const getInitialCenter = (): LatLngExpression => {
        // Use provided center prop if available
        if (center) {
            return center;
        }

        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);

        if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
            return [lat, lng];
        }
        return [20, 0]; // Default world center
    };

    const getInitialZoom = (): number => {
        if (zoom !== undefined) {
            return zoom;
        }
        return parseFloat(latitude) && parseFloat(longitude) ? 13 : 2;
    };

    const initialZoom = getInitialZoom();

    return (
        <div className="space-y-2">
            <div className="h-[400px] w-full rounded-lg overflow-hidden border">
                <MapContainer
                    center={getInitialCenter()}
                    zoom={initialZoom}
                    className="h-full w-full z-0"
                    scrollWheelZoom={true}
                >
                    <TileLayer url={mapTileLayer} attribution={mapAttribution} />
                    <MapClickHandler onMapClick={handleMapClick} />
                    {position && (
                        <>
                            <MapViewUpdater
                                lat={parseFloat(latitude) || 0}
                                lng={parseFloat(longitude) || 0}
                                position={position}
                            />
                            <Marker
                                position={position}
                                draggable={true}
                                ref={markerRef}
                                eventHandlers={{
                                    dragend: handleMarkerDragEnd,
                                    dragstart: handleMarkerDragStart,
                                }}
                            />
                        </>
                    )}
                </MapContainer>
            </div>
            <p className="text-sm text-muted-foreground">
                Click on the map to place a marker or drag the marker to adjust
                the location. The address will be automatically filled.
            </p>
        </div>
    );
}

