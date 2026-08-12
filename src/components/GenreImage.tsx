import { useEffect, useState } from "react";
import { Image, Skeleton } from "@chakra-ui/react";
import apiClient from "../services/api-clients";
import { getCroppedImageUrl } from "../services/image-url";

interface Props {
  genreId: number;
  genreName: string;
}

interface MovieDiscoverResponse {
  results: {
    poster_path: string | null;
    backdrop_path: string | null;
  }[];
}

const GenreImage = ({ genreId, genreName }: Props) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<MovieDiscoverResponse>("/discover/movie", {
        signal: controller.signal,
        params: {
          with_genres: genreId,
          sort_by: "popularity.desc",
          page: 1,
        },
      })
      .then((res) => {
        const topMovie = res.data.results[0];
        const imagePath = topMovie?.poster_path || topMovie?.backdrop_path;
        setImageUrl(getCroppedImageUrl(imagePath, "w300"));
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        setLoading(false);
      });

    return () => controller.abort();
  }, [genreId]);

  if (isLoading) return <Skeleton boxSize="32px" borderRadius={8} />;

  return (
    <Image
      boxSize="32px"
      borderRadius={8}
      objectFit="cover"
      src={imageUrl}
      alt={genreName}
    />
  );
};

export default GenreImage;