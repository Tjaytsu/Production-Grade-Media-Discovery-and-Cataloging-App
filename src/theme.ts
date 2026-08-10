import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  // Modern configuration goes here
  theme: {
    tokens: {},
  },
});

export const system = createSystem(defaultConfig, config);
export default system;
