import {
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { Movie } from "../hooks/useMovies";
import { getCroppedImageUrl } from "../services/image-url";
import VoteBadge from "./VoteBadge";
import StreamingProviders from "./StreamingProviders";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const CardRoot: any = (Card as any)?.Root ?? Card;

  return (
    <CardRoot>
      <Image
        src={getCroppedImageUrl(movie.backdrop_path, "w300")}
        alt={movie.title}
        objectFit="cover"
        width="100%"
      />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={2}>
          <Text fontSize="sm" color="gray.500">
            {releaseYear}
          </Text>
          <VoteBadge score={movie.vote_average} />
        </HStack>
        <Heading fontSize="2xl" marginBottom={3}>
          {movie.title}
        </Heading>
        <VStack alignItems="flex-start" gap={2}>
          <Text fontSize="xs" fontWeight="bold" color="gray.400">
            Available On:
          </Text>
          <StreamingProviders movieId={movie.id} />
        </VStack>
      </CardBody>
    </CardRoot>
  );
};

export default MovieCard;
