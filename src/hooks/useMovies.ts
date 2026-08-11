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
    
      useEffect(() => {

        const controller = new AbortController();

        apiClient
          .get<FetchMoviesResponse>("/discover/movie", { signal: controller.signal})
          .then((res) => setMovies(res.data.results))
          .catch((error) => {
            if(error instanceof CanceledError) return;
            setError(error.message)});

        return () => controller.abort();
      }, []);

      return {movies, error}
}

export default useMovies;