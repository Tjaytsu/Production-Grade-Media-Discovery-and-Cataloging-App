import useMovies from "../hooks/useMovies";

const MovieGrid = () => {

  const {movies, error} = useMovies()
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
