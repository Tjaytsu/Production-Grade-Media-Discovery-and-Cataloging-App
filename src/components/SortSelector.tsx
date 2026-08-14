import { Button, Menu } from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";
import useSortOptions from "../hooks/useSortOptions";

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const SortSelector = ({ onSelectSortOrder, sortOrder }: Props) => {
  const { sortOptions } = useSortOptions();

  // Finds the label matching the active sortOrder or defaults to "Popularity"
  const currentSortLabel =
    sortOptions.find((option) => option.value === sortOrder)?.label ||
    "Popularity";

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline">
          Order by: {currentSortLabel}
          <LuChevronDown />
        </Button>
      </Menu.Trigger>

      {/* Positioner positions the dropdown below the trigger */}
      <Menu.Positioner>
        <Menu.Content>
          {sortOptions.map((option) => (
            <Menu.Item
              key={option.value}
              value={option.value}
              onClick={() => onSelectSortOrder(option.value)}
            >
              {option.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default SortSelector;
