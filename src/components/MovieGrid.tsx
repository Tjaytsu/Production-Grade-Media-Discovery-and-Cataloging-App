import { useEffect, useState } from "react";
import apiClient from "../services/api-clients";

interface Movie {
  id: number;
  title: string;
}

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
}

const MovieGrid = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchMoviesResponse>("/discover/xmovie")
      .then((res) => setMovies(res.data.results))
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      {error && <text>{error}</text>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
};

export default MovieGrid;
