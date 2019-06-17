import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// eslint-disable-next-line
console.log();

const uri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/graphql'
    : 'http://docify.com/graphql';

export default new ApolloClient({
  link: new HttpLink({
    uri,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});
