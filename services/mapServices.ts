import axios from "axios";
import * as Location from "expo-location";

export const getNearbyPlaces = async (lat: number, lon: number, tag: string) => {
    const radius = 5000;
    const query = `
    [out:json];
    (
      node["amenity"="${tag}"](around:${radius},${lat},${lon});
      way["amenity"="${tag}"](around:${radius},${lat},${lon});
      relation["amenity"="${tag}"](around:${radius},${lat},${lon});
    );
    out center 5;
  `;

    try {
        const response = await axios.post("https://overpass-api.de/api/interpreter", query, {
            headers: { "Content-Type": "text/plain" },
        });

        const promises = response.data.elements.map(async (el: any) => {
            const elLon = el.lon || el.center?.lon;
            const elLat = el.lat || el.center?.lat;
            const distance = getDistanceFromLatLonInM(lat, lon, elLat, elLon);

            const [address] = await Location.reverseGeocodeAsync({
                longitude: elLon,
                latitude: elLat,
            });

            const formattedAddress = address ? `${address.street}, ${address.city}, ${address.country} ${address.postalCode}` : "Address not found";

            return {
                id: el.id,
                lat: elLat,
                lon: elLon,
                name: el.tags?.name || "Unknown Hospital",
                distance: distance,
                address: formattedAddress,
            };
        });

        // Wait for all the promises in the array to resolve
        const nearbyPlaces = await Promise.all(promises);
        return nearbyPlaces;
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        return [];
    }
};

export function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

export function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c

    return Math.round(distance * 100) / 100
}

