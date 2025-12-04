const baseURL =
  import.meta.env.VITE_BACKEND_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:1337";

export const BASE_URL = baseURL;
export const GRAPHQL_URL = `${BASE_URL}/graphql`;
