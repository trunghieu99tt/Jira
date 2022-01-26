import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_SERVER_URL } from '@config/secret';

const apolloClient = new ApolloClient({
  uri: GRAPHQL_SERVER_URL,
  cache: new InMemoryCache(),
});

export default apolloClient;
