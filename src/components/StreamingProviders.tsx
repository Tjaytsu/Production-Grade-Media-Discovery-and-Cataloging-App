import { HStack, Image, Text, Spinner } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import useMovieProviders from "../hooks/useMovieProviders";

interface Props {
  movieId: number;
}

const StreamingProviders = ({ movieId }: Props) => {
  const { providers, isLoading, error } = useMovieProviders(movieId);

  if (isLoading) return <Spinner size="sm" />;
  if (error || providers.length === 0)
    return (
      <Text fontSize="xs" color="gray.500">
        Not available
      </Text>
    );

  return (
    <HStack gap={2}>
      {providers.map((provider) => (
        <Tooltip.Root key={provider.provider_id}>
          <Tooltip.Trigger asChild>
            <Image
              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
              alt={provider.provider_name}
              boxSize="32px"
              borderRadius="4px"
              objectFit="cover"
            />
          </Tooltip.Trigger>
          <Tooltip.Content>{provider.provider_name}</Tooltip.Content>
        </Tooltip.Root>
      ))}
    </HStack>
  );
};

export default StreamingProviders;
