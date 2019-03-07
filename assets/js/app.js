// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import 'phoenix_html';

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import Spinner from './components/Spinner';
import client from './config/apolloClient';

// let Routes = lazy(() => import('../frontend/src/config/Routes'));
import Routes from './config/Routes';

let root = document.getElementById('root');

render(
  <Suspense fallback={<Spinner isLoading />}>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </Suspense>,
  root
);
