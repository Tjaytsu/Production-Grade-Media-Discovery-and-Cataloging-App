import useData from "./UseData";

export interface Genre {
  id: number;
  name: string;
  image_url?: string;
}


const useGenres = () => useData<Genre>('/genre/movie/list');

export default useGenres;