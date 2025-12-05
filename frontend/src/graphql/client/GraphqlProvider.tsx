/**
 * GraphQLProvider: React context provider for GraphQLClient.
 *
 * Provides a configured client to all descendant components via context.
 * Set your endpoint/headers here for flexible, testable, and decoupled queries.
 *
 * @param endpoint - The GraphQL HTTP endpoint URL
 * @param headers - (Optional) HTTP headers (auth, etc)
 * @param children - React children (consume client via useGraphQLClient)
 *
 * @example
 * <GraphQLProvider endpoint="https://api.example.com/graphql">
 *   <App />
 * </GraphQLProvider>
 */
import { type ReactNode, useMemo } from "react";
import {
  createGraphQLClient,
  type GraphQLClientConfig,
} from "./createGraphQLClient";
import { GraphQLContext } from "./GraphQLContext";

interface Props extends GraphQLClientConfig {
  children: ReactNode;
}

export function GraphQLProvider({ endpoint, headers, children }: Props) {
  const client = useMemo(
    () => createGraphQLClient({ endpoint, headers }),
    [endpoint, headers]
  );

  return (
    <GraphQLContext.Provider value={client}>{children}</GraphQLContext.Provider>
  );
}
