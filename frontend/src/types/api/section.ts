import type { ImageType } from "../image";

export type ComponentHeroHeroSection = {
  __typename: "ComponentHeroHeroSection";
  Title: string;
  HeroImage: ImageType;
  Description: string;
};

export type ComponentHeroHeroVertical = {
  __typename: "ComponentHeroHeroVertical";
  Title: string;
  Description: string;
  HeroImage: ImageType;
};

export type SectionType = ComponentHeroHeroSection | ComponentHeroHeroVertical;
