// src/services/image-url.ts

import noImage from '../assets/no-image-placeholder-6f3882e0.webp';

const NO_IMAGE = "https://placehold.co/600x400/2a2a2a/ffffff?text=No+Image";

export const getCroppedImageUrl = (
  path: string | null,
  size: "w300" | "w500" | "w780" = "w300"
) => {
  if (!path) return noImage;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};