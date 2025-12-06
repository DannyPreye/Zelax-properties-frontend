/**
 * Countries utility using REST Countries API
 * Free API: https://restcountries.com/
 */

export interface Country {
    name: {
        common: string;
        official: string;
    };
    cca2: string; // ISO 3166-1 alpha-2 code
    latlng: [number, number]; // [latitude, longitude]
}

// Cache for countries list
let countriesCache: Country[] | null = null;

/**
 * Fetch list of all countries from REST Countries API
 * @returns Promise with array of countries
 */
export async function fetchCountries(): Promise<Country[]> {
    if (countriesCache) {
        return countriesCache;
    }

    try {
        const response = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,cca2,latlng"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }

        const data: Country[] = await response.json();
        // Sort countries alphabetically by common name
        countriesCache = data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
        );
        return countriesCache;
    } catch (error) {
        console.error("Error fetching countries:", error);
        throw error;
    }
}

/**
 * Get country coordinates by country name
 * @param countryName Country name (common name)
 * @returns Promise with latitude and longitude, or null if not found
 */
export async function getCountryCoordinates(
    countryName: string
): Promise<{ lat: number; lng: number } | null> {
    try {
        const countries = await fetchCountries();
        const country = countries.find(
            (c) =>
                c.name.common.toLowerCase() === countryName.toLowerCase() ||
                c.name.official.toLowerCase() === countryName.toLowerCase()
        );

        if (country && country.latlng && country.latlng.length === 2) {
            return {
                lat: country.latlng[0],
                lng: country.latlng[1],
            };
        }

        return null;
    } catch (error) {
        console.error("Error getting country coordinates:", error);
        return null;
    }
}




