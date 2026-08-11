import { useEffect, useState } from "react";
import apiClient from "../services/api-clients";
import { CanceledError } from "axios";

export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
}

const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | null = null;
    const MIN_LOADING_MS = 500; // keep skeleton visible at least this long
    const start = Date.now();

    setLoading(true);

    apiClient
      .get<FetchMoviesResponse>("/discover/movie", { signal: controller.signal })
      .then((res) => {
        const applyResult = () => {
          setMovies(res.data.results);
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
  }, []);

  return { movies, error, isLoading };
};

export default useMovies;