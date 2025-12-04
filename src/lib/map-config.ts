import L from 'leaflet';
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

export const defaultMapCenter: [ number, number ] = [ 20, 0 ]; // World center
export const defaultZoom = 2;

export const mapTileLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const mapAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Custom marker icon
export function createPropertyMarkerIcon(color: string = '#FF5A5F')
{
    return L.divIcon({
        className: 'custom-marker',
        html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          text-align: center;
          line-height: 24px;
          font-size: 12px;
        ">🏠</div>
      </div>
    `,
        iconSize: [ 30, 30 ],
        iconAnchor: [ 15, 30 ],
    });
}

// Map bounds helper
export function getBoundsFromProperties(properties: Array<{ latitude?: string; longitude?: string; }>)
{
    if (properties.length === 0) return null;

    const lats = properties
        .map((p) => parseFloat(p.latitude || '0'))
        .filter((lat) => !isNaN(lat));
    const lngs = properties
        .map((p) => parseFloat(p.longitude || '0'))
        .filter((lng) => !isNaN(lng));

    if (lats.length === 0 || lngs.length === 0) return null;

    return L.latLngBounds(
        [ Math.min(...lats), Math.min(...lngs) ],
        [ Math.max(...lats), Math.max(...lngs) ]
    );
}





