# Custom GraphQL Client (React Context)

> Flexible, lightweight GraphQL client/provider for React apps. Easily inject any endpoint, headers, and access a robust client from hooks/components without vendor lock-in or bundle bloat.

## Overview

This folder provides a zero-dependency GraphQL provider/context for React, enabling:
- Dynamic endpoint configuration via context provider
- Support for custom headers (authentication, etc)
- Type-safe API for requests (`client.request<T>(...)`)
- No Apollo/Relay dependency—write fast, direct queries
- Full TypeScript docs/intellisense for IDE hover support

---

## Architecture

- **GraphqlProvider**: React Provider. Set endpoint/headers for your app.
- **GraphQLContext**: Context object. Exposes the `GraphQLClient` in any tree below a provider.
- **useGraphQLClient**: Hook to get the current GraphQL client (throws if called outside provider).
- **createGraphQLClient**: Returns a client object for low-level usage/testing.

---

## Usage

### 1. Wrap your app
```tsx
import { GraphQLProvider } from "./graphql/client";

const endpoint = process.env.REACT_APP_GRAPHQL_URL || "http://localhost:1337/graphql";

<GraphQLProvider endpoint={endpoint}>
  <App />
</GraphQLProvider>
```

You may pass custom headers:
```tsx
<GraphQLProvider endpoint="..." headers={{ Authorization: `Bearer ...` }}>
  {children}
</GraphQLProvider>
```

### 2. Use in hooks/components
```tsx
import { useGraphQLClient } from "./graphql/client";

function MyComponent() {
  const client = useGraphQLClient();

  // TS typings are available on hover for .request
  useEffect(() => {
    client.request("query { ... }")
      .then(data => ...)
      .catch(err => ...);
  }, [client]);
}
```

Or build custom hooks on top to add caching/query state, etc.

---

## API Reference

### `GraphQLProvider`
```tsx
/**
 * Provides a GraphQL client via React Context. Set endpoint/headers here.
 * @param endpoint - The GraphQL HTTP endpoint
 * @param headers - Optional headers (e.g., auth)
 * @example
 *   <GraphQLProvider endpoint="https://...">...</GraphQLProvider>
 */
function GraphQLProvider({ endpoint, headers, children }: Props): JSX.Element;
```

### `useGraphQLClient()`
```tsx
/**
 * Get the current GraphQL client (context).
 * @throws if not wrapped in <GraphQLProvider>
 */
function useGraphQLClient(): GraphQLClient;
```

### `createGraphQLClient(config)`
```ts
/**
 * Create a standalone GraphQLClient instance (for direct use or testing).
 * @param endpoint string - GraphQL endpoint
 * @param headers?  - Custom headers
 * @returns GraphQLClient
 */
function createGraphQLClient(config: GraphQLClientConfig): GraphQLClient;
```

### `GraphQLClient.request`
```ts
/**
 * Make a GraphQL request via POST
 * @param query - GraphQL query string
 * @param variables - (optional)
 * @returns Promise<TData>
 * @throws if GraphQL returns errors
 */
request<TData, TVariables = undefined>(query: string, variables?: TVariables): Promise<TData>;
```

---

## Error Handling
- If you call `useGraphQLClient` outside a `<GraphQLProvider>`, it throws an error immediately.
- If the request receives `errors` from the server, `.request` throws with a joined string of error messages.

---

## Example

```tsx
import { GraphQLProvider, useGraphQLClient } from "./graphql/client"

function Example() {
  const client = useGraphQLClient();
  const [data, setData] = useState(null);
  useEffect(() => {
    client.request<{ users: { name: string }[] }>(`query { users { name } }`)
      .then((result) => setData(result.users))
      .catch(console.error);
  }, [client]);
  // ...
}
```

---

## For Custom Hooks: useQuery Example
Build `useGraphQLQuery` (or similar) on top of `useGraphQLClient` for
- caching
- error/loading state
- SSR/prepass if you want

---

## Summary
- Provider-based, no hardcoded endpoint, supports any env
- Fully tree-shakable, no large bundles
- DX: Complete TypeScript documentation and hover support in supported editors
- Use as a base for all GraphQL integration in your React app
