import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "../services/api-clients";

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface ProvidersResponse {
  results: {
    [key: string]: {
      flatrate?: WatchProvider[];
      rent?: WatchProvider[];
      buy?: WatchProvider[];
    };
  };
}

const useMovieProviders = (movieId: number) => {
  const [providers, setProviders] = useState<WatchProvider[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const controller = new AbortController();
    setLoading(true);

    apiClient
      .get<ProvidersResponse>(`/movie/${movieId}/watch/providers`, {
        signal: controller.signal,
      })
      .then((res) => {
        // Get US providers (or first available region)
        const regionData = res.data.results?.US || res.data.results?.[Object.keys(res.data.results)[0]];
        
        if (regionData) {
          // Combine all providers (flatrate, rent, buy)
          const allProviders = [
            ...(regionData.flatrate || []),
            ...(regionData.rent || []),
            ...(regionData.buy || []),
          ];
          
          // Remove duplicates by provider_id
          const uniqueProviders = Array.from(
            new Map(allProviders.map((p) => [p.provider_id, p])).values()
          );
          
          setProviders(uniqueProviders);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [movieId]);

  return { providers, error, isLoading };
};

export default useMovieProviders;
