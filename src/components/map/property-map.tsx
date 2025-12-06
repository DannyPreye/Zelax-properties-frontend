'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { createPropertyMarkerIcon, defaultMapCenter, defaultZoom, mapTileLayer, mapAttribution } from '@/lib/map-config';
import type { PropertyList } from '@/lib/api/models/PropertyList';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
}

interface MapBoundsUpdaterProps {
  bounds: [number, number, number, number] | null;
}

function MapBoundsUpdater({ bounds }: MapBoundsUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      const [south, west, north, east] = bounds;
      map.fitBounds(
        [
          [south, west],
          [north, east],
        ],
        { padding: [50, 50] }
      );
    }
  }, [bounds, map]);

  return null;
}

interface PropertyMapProps {
  properties: PropertyList[];
  selectedPropertyId?: number;
  onPropertyClick?: (propertyId: number) => void;
  className?: string;
}

export function PropertyMap({
  properties,
  selectedPropertyId,
  onPropertyClick,
  className = 'h-[600px] w-full',
}: PropertyMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Calculate bounds from properties
  // Note: PropertyList doesn't include lat/lng, so we'll use default bounds
  // In production, you'd fetch PropertyDetail for each property or include lat/lng in list endpoint
  const bounds: [number, number, number, number] | null = null;

  return (
    <div className={className}>
      <MapContainer
        center={defaultMapCenter}
        zoom={defaultZoom}
        className="h-full w-full rounded-lg z-0"
        ref={mapRef}
      >
        <TileLayer url={mapTileLayer} attribution={mapAttribution} />
        {bounds && <MapBoundsUpdater bounds={bounds} />}
        {properties.map((property) => {
          // Note: PropertyList doesn't include lat/lng coordinates
          // In production, you'd need to fetch PropertyDetail or include coordinates in list response
          // For now, we'll use a default position - you may want to geocode addresses
          const position: LatLngExpression = [20, 0]; // Default/placeholder
          const isSelected = property.id === selectedPropertyId;

          return (
            <Marker
              key={property.id}
              position={position}
              icon={createPropertyMarkerIcon(L, isSelected ? '#00A699' : '#FF5A5F')}
              eventHandlers={{
                click: () => {
                  onPropertyClick?.(property.id);
                },
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold mb-1">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {property.city}, {property.country}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    ${property.base_price}/night
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

