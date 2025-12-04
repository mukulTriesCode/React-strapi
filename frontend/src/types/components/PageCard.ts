import type { ImageType } from "../image";
import type { RFCType } from "../react";

export type PageCardProps = {
  Title: string;
  Thumbnail: ImageType;
  Description: string;
  slug: string;
};

export type PageCardType = RFCType<PageCardProps>;
