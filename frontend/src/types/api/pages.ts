import type { ImageType } from "../image";
import type { SectionType } from "./section";

export type SinglePageType = {
  __typename: "Page";
  Title: string;
  Description: string;
  slug: string;
  ThumbnailImage: ImageType;
  Sections?: SectionType[];
};

export type PagesResponse = {
  pages: SinglePageType[];
};
