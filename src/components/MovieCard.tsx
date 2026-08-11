import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import type { Movie } from "../hooks/useMovies";
import { getCroppedImageUrl } from "../services/image-url";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Card.Root borderRadius={10} overflow="hidden" boxShadow="md">
      <Image
        src={getCroppedImageUrl(movie.backdrop_path, "w300")}
        alt={movie.title}
        objectFit="cover"
        aspectRatio={16 / 9}
        width="100%"
      />
      <CardBody>
        <Heading fontSize="2xl">{movie.title}</Heading>
      </CardBody>
    </Card.Root>
  );
};

export default MovieCard;
