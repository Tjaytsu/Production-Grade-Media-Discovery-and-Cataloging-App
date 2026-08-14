import useData from "./UseData";
import type { Genre } from "./useGenres";
import type { Provider } from "./usePlatforms";
import type { MovieQuery } from "../interfaces/MovieQuery";

export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}


const useMovies = (
  _selectedGenre: Genre | null,
  _page: number = 1,
  _selectedProvider: Provider | null = null,
  _sortOrder: string = "popularity.desc",
  _movieQuery: MovieQuery = { searchText: "" }
) => {
  const endpoint = _movieQuery.searchText ? '/search/movie' : '/discover/movie';
  
  const params = {
    ...(!!_movieQuery.searchText && { query: _movieQuery.searchText }),
    ...(!!_selectedGenre?.id && !_movieQuery.searchText && { with_genres: _selectedGenre.id }),
    ...(!!_selectedProvider?.provider_id && !_movieQuery.searchText && { with_watch_providers: _selectedProvider.provider_id }),
    ...((!_movieQuery.searchText) && { sort_by: _sortOrder }),
    page: _page,
  };
  
  return useData<Movie>(
    endpoint,
    { params },
    [_selectedGenre?.id, _page, _selectedProvider?.provider_id, _sortOrder, _movieQuery.searchText]
  );
};

export default useMovies;