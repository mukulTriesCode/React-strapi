import { createContext, useContext } from "react";
import type { GraphQLClient } from "./createGraphQLClient";

/**
 * React Context holding the current GraphQLClient instance.
 * Provided via <GraphQLProvider>. Consumer hooks/components should use useGraphQLClient().
 */
export const GraphQLContext = createContext<GraphQLClient | null>(null);

/**
 * Access the current GraphQLClient from context.
 * @throws Error if used outside <GraphQLProvider>
 * @returns GraphQLClient instance
 */
export function useGraphQLClient(): GraphQLClient {
  const client = useContext(GraphQLContext);
  if (!client) {
    throw new Error("useGraphQLClient must be used inside <GraphQLProvider>");
  }
  return client;
}
