import { BASE_URL } from "src/configs";

export const imageUrl = function(url: string) {
  return `${BASE_URL}/${url}`;
};
