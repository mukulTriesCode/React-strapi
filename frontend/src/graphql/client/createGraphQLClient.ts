/**
 * GraphQLClientConfig: Configuration for GraphQL client instance.
 * @property endpoint - GraphQL API URL
 * @property headers - Optional: HTTP headers (for auth, etc)
 */
export interface GraphQLClientConfig {
  endpoint: string;
  headers?: Record<string, string>;
}

/**
 * GraphQLClient: Client object for GraphQL requests
 * @property endpoint - The configured endpoint
 * @property headers - Headers used for requests
 * @method request - Executes a GraphQL query or mutation.
 */
export interface GraphQLClient {
  endpoint: string;
  headers: Record<string, string>;
  /**
   * Make a POST GraphQL request
   * @param query - GraphQL query string
   * @param variables - (optional) Variables object
   * @returns Parsed data property of response
   * @throws Error if GraphQL returns errors
   */
  request<TData, TVars = undefined>(
    query: string,
    variables?: TVars
  ): Promise<TData>;
}

/**
 * Create a new GraphQLClient instance
 * @param config.endpoint - The GraphQL HTTP endpoint
 * @param config.headers - (Optional) Additional headers
 * @returns GraphQLClient ready for making queries
 */
export function createGraphQLClient(
  config: GraphQLClientConfig
): GraphQLClient {
  const { endpoint, headers = {} } = config;

  return {
    endpoint,
    headers,

    /**
     * Executes a typed GraphQL request (POST)
     * @param query The GraphQL query or mutation string
     * @param variables (optional) variables
     * @returns Promise of parsed data
     * @throws Error if GraphQL errors are returned by server
     */
    async request<TData, TVars = undefined>(
      query: string,
      variables?: TVars
    ): Promise<TData> {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({ query, variables }),
      });

      const json = await res.json();

      if ("errors" in json) {
        const messages = json.errors
          .map((e: { message: string }) => e.message)
          .join("\n");
        throw new Error(messages);
      }

      return json.data as TData;
    },
  };
}
