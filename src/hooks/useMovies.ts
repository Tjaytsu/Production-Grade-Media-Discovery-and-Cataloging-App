import useData from "./UseData";
import type { Genre } from "./useGenres";
import type { Provider } from "./usePlatforms";

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
  _sortOrder: string = "popularity.desc"
) => {
  const params = {
    ...(!!_selectedGenre?.id && { with_genres: _selectedGenre.id }),
    ...(!!_selectedProvider?.provider_id && { with_watch_providers: _selectedProvider.provider_id }),
    sort_by: _sortOrder,
    page: _page,
  };
  return useData<Movie>(
    '/discover/movie',
    { params },
    [_selectedGenre?.id, _page, _selectedProvider?.provider_id, _sortOrder]
  );
};

export default useMovies;