/**
 * Geolocation utilities for getting user's current location
 */

export interface GeolocationPosition {
    latitude: number;
    longitude: number;
}

/**
 * Get user's current location using browser Geolocation API
 * @returns Promise with latitude and longitude
 */
export function getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
}




