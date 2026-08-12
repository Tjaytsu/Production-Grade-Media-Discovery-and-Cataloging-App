import useData from "./UseData";

export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}


const useMovies = () => useData<Movie>('/discover/movie');

export default useMovies;