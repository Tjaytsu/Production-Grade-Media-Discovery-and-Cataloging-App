import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";
import type { Movie } from "../hooks/useMovies";
import { getCroppedImageUrl } from "../services/image-url";
import VoteBadge from "./VoteBadge";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const CardRoot: any = (Card as any)?.Root ?? Card;

  return (
    <CardRoot >
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
        <Heading fontSize="2xl">{movie.title}</Heading>
      </CardBody>
    </CardRoot>
  );
};

export default MovieCard;
