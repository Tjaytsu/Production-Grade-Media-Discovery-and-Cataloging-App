import useData from "./UseData";
import type { Genre } from "./useGenres";

export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}


const useMovies = (_selectedGenre: Genre | null, _page: number = 1) => {
  const params = {
    ...(!!_selectedGenre?.id && { with_genres: _selectedGenre.id }),
    sort_by: "popularity.desc",
    page: _page,
  };
  return useData<Movie>('/discover/movie', { params }, [_selectedGenre?.id, _page]);
};

export default useMovies;