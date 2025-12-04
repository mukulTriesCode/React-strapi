import { BASE_URL } from "../constants/api";

export const generateImageURL = (src: string) => {
  return BASE_URL + src;
};
