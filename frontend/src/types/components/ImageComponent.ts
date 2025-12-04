import type { ImageType } from "../image";
import type { RFCType } from "../react";

export type ImageProps = {
  src: ImageType;
  objectFit?: "cover" | "contain" | "unset";
  rounded?: boolean;
  aspectRatio?: string;
  priority?: boolean;
  width?: string;
  height?: string;
  hasMargin?: boolean;
};

export type ImageComponentType = RFCType<ImageProps>;
