
import useGenres from "../hooks/useGenres";

import { Box, Text } from "@chakra-ui/react";

const GenreList = () => {
  const { data, error, isLoading } = useGenres();

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box as="ul" padding={4} display="flex" flexDirection="column" gap={2}>
      {isLoading ? (
        <Text>Loading genres...</Text>
      ) : (
        data.map((genre) => (
          <Text as="li" key={genre.id}>
            {genre.name}
          </Text>
        ))
      )}
    </Box>
  );
};

export default GenreList;
