// src/components/PlatformSelector.tsx
import { Button, Menu } from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";
import usePlatforms from "../hooks/usePlatforms";
import type { Provider } from "../hooks/usePlatforms";

interface Props {
  onSelectProvider: (provider: Provider | null) => void;
  selectedProvider: Provider | null;
}

const PlatformSelector = ({ onSelectProvider, selectedProvider }: Props) => {
  const { providers } = usePlatforms();

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline">
          {selectedProvider
            ? selectedProvider.provider_name
            : "Streaming Services"}
          <LuChevronDown />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {/* Reset Option */}
          <Menu.Item value="all" onClick={() => onSelectProvider(null)}>
            All Streaming Services
          </Menu.Item>

          {providers.map((provider) => (
            <Menu.Item
              key={provider.provider_id}
              value={provider.provider_id.toString()}
              onClick={() => onSelectProvider(provider)}
            >
              {provider.provider_name}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default PlatformSelector;
