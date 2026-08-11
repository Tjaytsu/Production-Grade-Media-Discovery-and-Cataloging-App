import { Card, CardBody, Skeleton, Stack } from "@chakra-ui/react";

const MovieCardSkeleton = () => {
  const CardRoot: any = (Card as any)?.Root ?? Card;

  return (
    <CardRoot borderRadius={10} overflow="hidden" boxShadow="sm" width="100%">
      {/* Matches backdrop 16:9 aspect ratio height */}
      <Skeleton height="160px" width="100%" />
      <CardBody>
        <Stack gap={3}>
          <Skeleton height="16px" width="40%" />
          <Skeleton height="24px" width="80%" />
        </Stack>
      </CardBody>
    </CardRoot>
  );
};

export default MovieCardSkeleton;
