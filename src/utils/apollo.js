import { ApolloClient, InMemoryCache } from "@apollo/client";
import config from "../config";

export const client = new ApolloClient({
  uri: config.graphqlApiUrl,
  cache: new InMemoryCache(),
});
