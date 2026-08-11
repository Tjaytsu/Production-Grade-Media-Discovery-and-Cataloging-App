import { SimpleGrid, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieGrid = () => {
  console.log("MovieGrid render");
  const { movies, error, isLoading } = useMovies();
  const Skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {error && <Text color="red.500">{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding={10}
        gap={10}
      >
        {isLoading &&
          Skeletons.map((skeleton) => <MovieCardSkeleton key={skeleton} />)}
        {!isLoading &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
