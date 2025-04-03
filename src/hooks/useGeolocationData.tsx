// src/hooks/useGeospatialData.ts
import { useQuery } from "@tanstack/react-query";
import { fetchGeolocationData } from "../services/FetchGeolocationData";
import { GeolocationRecord } from "../types/GeolocationRecord";

export const useGeospatialData = () => {
  return useQuery<GeolocationRecord[], Error>({
    queryKey: ["geospatialData"],
    queryFn: fetchGeolocationData,
    staleTime: Infinity, // Cache data indefinitely for performance
  });
};
