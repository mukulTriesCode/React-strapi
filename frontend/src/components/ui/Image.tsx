import type { ImageComponentType } from "../../types";
import { generateImageURL } from "../../utils/image";

const Image: ImageComponentType = ({
  src,
  objectFit = "cover",
  aspectRatio = "auto",
  rounded,
  priority,
  height = "auto",
  width = "100%",
  hasMargin = false,
}) => {
  if (!src?.url) {
    return;
  }

  const imageURL = generateImageURL(src?.url);

  const roundedStyles = rounded
    ? {
        borderRadius: "20px",
        overflow: "hidden",
      }
    : {};

  return (
    <div
      className="image"
      style={{
        marginBlock: hasMargin ? "1rem" : "0",
        aspectRatio,
        width,
        height,
        ...roundedStyles,
      }}
    >
      <img
        style={{ width: "100%", height: "100%", objectFit }}
        src={imageURL}
        alt={src?.alternativeText || "Image"}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
};

export default Image;
