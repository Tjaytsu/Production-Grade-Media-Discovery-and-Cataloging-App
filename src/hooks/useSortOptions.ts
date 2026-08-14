export interface SortOption {
  value: string;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "primary_release_date.desc", label: "Release Date" },
  { value: "vote_average.desc", label: "Average Rating" },
//   { value: "original_title", label: "Name (A-Z)" },
  { value: "revenue.desc", label: "Box Office Revenue" },
];

const useSortOptions = () => {
  return { sortOptions: SORT_OPTIONS };
};

export default useSortOptions;
