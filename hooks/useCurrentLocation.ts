import { useEffect, useState } from "react";
import * as Location from "expo-location";

type FormattedAddress = {
    header: string,
    detail: string
}
type LocationData = {
    coords: {
        latitude: number;
        longitude: number;
    };
    address?: Location.LocationGeocodedAddress;
    formattedAddress?: FormattedAddress
};

export function useCurrentLocation() {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setErrorMsg("Permission to access location was denied");
                    setLoading(false);
                    return;
                }
                const currentLocation = await Location.getCurrentPositionAsync({});
                const [address] = await Location.reverseGeocodeAsync({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                });
                const addressHeader = `${address.street ?? ""} ${address.streetNumber ?? ""}`.trim();
                const detailParts = [
                    address.district,
                    address.subregion,
                    address.region,
                    address.city,
                    address.country,
                    address.postalCode,
                ].filter(Boolean);
                
                const addressDetail = detailParts.join(", ");

                setLocation({
                    coords: {
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude,
                    },
                    address: address,
                    formattedAddress: {
                        header: addressHeader ?? '',
                        detail: addressDetail ?? ''
                    }
                });
            } catch (err) {
                setErrorMsg("Failed to get location");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { location, errorMsg, loading };
}
