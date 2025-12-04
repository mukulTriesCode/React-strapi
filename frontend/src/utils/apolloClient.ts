import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { GRAPHQL_URL } from "../constants/api";

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
