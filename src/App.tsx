// src/App.tsx
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";
import GenreList from "./components/GenreList";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import MovieHeading from "./components/MovieHeading";
import type { Genre } from "./hooks/useGenres";
import type { Provider } from "./hooks/usePlatforms";

export interface MovieQuery {
  genre: Genre | null;
  provider: Provider | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    genre: null,
    provider: null,
    sortOrder: "popularity.desc",
    searchText: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(searchText) =>
            setMovieQuery({ ...movieQuery, searchText })
          }
        />
      </GridItem>

      <GridItem
        area="aside"
        display={{ base: "none", lg: "block" }}
        paddingX={5}
      >
        <GenreList
          onSelectGenre={(genre) => {
            setMovieQuery({ ...movieQuery, genre });
            setCurrentPage(1);
          }}
          selectedGenre={movieQuery.genre}
        />
      </GridItem>

      <GridItem area="main">
        <Box paddingLeft={10}>
          {/* Now MovieHeading gets the updated genre & provider! */}
          <MovieHeading movieQuery={movieQuery} />

          <Flex gap={5} marginBottom={5} marginTop={0.2}>
            <PlatformSelector
              onSelectProvider={(provider) => {
                setMovieQuery({ ...movieQuery, provider });
                setCurrentPage(1);
              }}
              selectedProvider={movieQuery.provider}
            />
            <SortSelector
              onSelectSortOrder={(order) => {
                setMovieQuery({ ...movieQuery, sortOrder: order });
                setCurrentPage(1);
              }}
              sortOrder={movieQuery.sortOrder}
            />
          </Flex>
        </Box>

        <MovieGrid
          selectedGenre={movieQuery.genre}
          selectedProvider={movieQuery.provider}
          sortOrder={movieQuery.sortOrder}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          movieQuery={movieQuery}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
