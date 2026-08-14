import { SimpleGrid, Text, HStack, Button } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import MovieCardContainer from "./MovieCardContainer";
import type { Genre } from "../hooks/useGenres";
import type { Provider } from "../hooks/usePlatforms";
import type { MovieQuery } from "../interfaces/MovieQuery";

interface Props {
  selectedGenre: Genre | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  selectedProvider: Provider | null;
  sortOrder: string;
  movieQuery: MovieQuery;
}

const MovieGrid = ({
  selectedGenre,
  currentPage,
  onPageChange,
  selectedProvider,
  sortOrder,
  movieQuery,
}: Props) => {
  console.log("MovieGrid render");
  const { data, error, isLoading } = useMovies(
    selectedGenre,
    currentPage,
    selectedProvider,
    sortOrder,
    movieQuery,
  );
  const Skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {error && <Text color="red.500">{error}</Text>}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding={10} gap={5}>
        {isLoading &&
          Skeletons.map((skeleton) => (
            <MovieCardContainer key={skeleton}>
              <MovieCardSkeleton />
            </MovieCardContainer>
          ))}
        {!isLoading &&
          data.map((movie) => (
            <MovieCardContainer key={movie.id}>
              <MovieCard movie={movie} />
            </MovieCardContainer>
          ))}
      </SimpleGrid>

      <HStack justifyContent="center" gap={4} paddingY={8}>
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Text>Page {currentPage}</Text>
        <Button
          disabled={data.length === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </HStack>
    </>
  );
};

export default MovieGrid;
