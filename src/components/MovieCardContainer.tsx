import { Box } from "@chakra-ui/react";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MovieCardContainer = ({ children }: Props) => {
  return (
    <Box borderRadius={10} overflow="hidden" boxShadow="md" width="100%">
      {children}
    </Box>
  );
};

export default MovieCardContainer;
