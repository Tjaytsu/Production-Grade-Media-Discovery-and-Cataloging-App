import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

const SearchInput = () => (
  <InputGroup startElement={<LuSearch />}>
    <Input borderRadius={20} placeholder="Search games..." variant="subtle" />
  </InputGroup>
);

export default SearchInput;
