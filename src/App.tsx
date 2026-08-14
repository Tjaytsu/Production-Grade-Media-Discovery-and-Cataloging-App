import { Flex, Grid, GridItem, HStack } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";
import GenreList from "./components/GenreList";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import type { Genre } from "./hooks/useGenres";
import type { Provider } from "./hooks/usePlatforms";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [sortOrder, setSortOrder] = useState("popularity.desc");

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`, // Mobile view
        lg: `"nav nav" "aside main"`, //1024px
      }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem
        area="aside"
        display={{ base: "none", lg: "block" }}
        paddingX={5}
      >
        <GenreList
          onSelectGenre={(genre) => {
            setSelectedGenre(genre);
            setCurrentPage(1);
          }}
          selectedGenre={selectedGenre}
        />
      </GridItem>
      <GridItem area="main">
        <Flex gap={5} paddingLeft={10} marginBottom={5} marginTop={0.2}>
          <PlatformSelector
            onSelectProvider={(provider) => {
              setSelectedProvider(provider);
              setCurrentPage(1);
            }}
            selectedProvider={selectedProvider}
          />
          <SortSelector
            onSelectSortOrder={(order) => {
              setSortOrder(order);
              setCurrentPage(1);
            }}
            sortOrder={sortOrder}
          />
        </Flex>
        <MovieGrid
          selectedGenre={selectedGenre}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          selectedProvider={selectedProvider}
          sortOrder={sortOrder}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
