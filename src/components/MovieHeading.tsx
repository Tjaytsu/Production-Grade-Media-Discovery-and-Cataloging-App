import { Heading } from "@chakra-ui/react";
import type { MovieQuery } from "../interfaces/MovieQuery";

interface Props {
  movieQuery: MovieQuery;
}
const MovieHeading = ({ movieQuery }: Props) => {
  const heading = `${movieQuery.platform?.name || ""} ${movieQuery.genre?.name || ""} movies`;
  return (
    <Heading marginY={5} fontSize={"5xl"} as={"h1"}>
      {heading}
    </Heading>
  );
};

export default MovieHeading;
