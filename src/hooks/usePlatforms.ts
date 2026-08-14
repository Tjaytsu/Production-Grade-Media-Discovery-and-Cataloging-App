export interface Provider {
  provider_id: number;
  provider_name: string;
}

// Common TMDB Watch Provider IDs for US/Global
const POPULAR_PROVIDERS: Provider[] = [
  { provider_id: 8, provider_name: "Netflix" },
  { provider_id: 337, provider_name: "Disney Plus" },
  { provider_id: 9, provider_name: "Amazon Prime Video" },
  { provider_id: 350, provider_name: "Apple TV Plus" },
  { provider_id: 1899, provider_name: "Max (HBO)" },
  { provider_id: 15, provider_name: "Hulu" },
];

const usePlatforms = () => {
  return { providers: POPULAR_PROVIDERS };
};

export default usePlatforms;
