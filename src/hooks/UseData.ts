import { CanceledError, type AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-clients";

interface FetchResponse<T> {
  results?: T[];
  genres?: T[];
}

const useData = <T>(endpoint:string, _requestConfig?: AxiosRequestConfig, _deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
      const [error, setError] = useState("");
      const [isLoading, setLoading] = useState(true);
    
      useEffect(() => {
        const controller = new AbortController();
        let timer: ReturnType<typeof setTimeout> | null = null;
        const MIN_LOADING_MS = 500; // keep skeleton visible at least this long
        const start = Date.now();
    
        setLoading(true);
    
        apiClient
          .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ..._requestConfig })
          .then((res) => {
            const applyResult = () => {
              setData(res.data.results ?? res.data.genres ?? []);
              setLoading(false);
            };
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
            timer = setTimeout(applyResult, remaining);
          })
          .catch((error) => {
            if (error instanceof CanceledError) return;
            const applyError = () => {
              setError(error.message);
              setLoading(false);
            };
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
            timer = setTimeout(applyError, remaining);
          });
    
        return () => {
          controller.abort();
          if (timer) clearTimeout(timer);
        };
      }, _deps ?[..._deps] : []);
    
      return { data, error, isLoading };
};

export default useData;