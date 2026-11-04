import { useEffect, useState } from "react";
import { GEO_OPTIONS, KYIV_COORDS } from "../config";

const FALLBACK_STATE = {
  coords: KYIV_COORDS,
  isLocating: false,
  isFallback: true,
};

const isGeolocationSupported = () => "geolocation" in navigator;

export function useGeolocation() {
  // Lack of support is known before the first render, so decide it here
  // instead of calling setState inside the effect.
  const [geoState, setGeoState] = useState(() =>
    isGeolocationSupported()
      ? { coords: null, isLocating: true, isFallback: false }
      : FALLBACK_STATE,
  );

  useEffect(() => {
    if (!isGeolocationSupported()) return;

    let isActive = true;

    const handleSuccess = (position) => {
      if (!isActive) return;

      setGeoState({
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        isLocating: false,
        isFallback: false,
      });
    };

    const handleError = () => {
      if (!isActive) return;

      setGeoState(FALLBACK_STATE);
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      GEO_OPTIONS,
    );

    return () => {
      isActive = false;
    };
  }, []);

  return geoState;
}
