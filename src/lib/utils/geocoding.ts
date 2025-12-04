/**
 * Reverse geocoding utility using Nominatim (OpenStreetMap) API
 * Rate limit: 1 request/second
 */

export interface GeocodingResult {
    address: string;
    city: string;
    country: string;
}

/**
 * Reverse geocode coordinates to get address information
 * @param lat Latitude
 * @param lng Longitude
 * @returns Promise with address, city, and country
 */
export async function reverseGeocode(
    lat: number,
    lng: number
): Promise<GeocodingResult> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
            {
                headers: {
                    'User-Agent': 'Zelax Properties App', // Required by Nominatim
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch address information');
        }

        const data = await response.json();

        if (!data || !data.address) {
            throw new Error('No address data found');
        }

        const address = data.address;

        // Extract address components
        const streetAddress =
            address.road ||
            address.street ||
            address.pedestrian ||
            address.path ||
            '';

        const houseNumber = address.house_number || '';
        const fullAddress = [houseNumber, streetAddress]
            .filter(Boolean)
            .join(' ')
            .trim() || address.suburb || address.neighbourhood || '';

        const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.county ||
            '';

        const country = address.country || '';

        return {
            address: fullAddress || 'Address not available',
            city: city || 'City not available',
            country: country || 'Country not available',
        };
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        throw error;
    }
}

