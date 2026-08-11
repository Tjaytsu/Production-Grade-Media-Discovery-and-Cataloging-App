import { Badge } from "@chakra-ui/react";

interface Props {
  score: number;
}

const VoteBadge = ({ score }: Props) => {
  // Dynamically set Chakra UI v3 colorPalette based on rating
  const color = score >= 7.5 ? "green" : score >= 6.0 ? "yellow" : "red";

  return (
    <Badge colorPalette={color} fontSize="13px" paddingX={2} borderRadius="4px">
      {score.toFixed(1)}
    </Badge>
  );
};

export default VoteBadge;