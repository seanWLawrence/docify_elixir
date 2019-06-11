import 'phoenix_html';

import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import Spinner from 'components/Spinner';
import client from 'config/apolloClient';

let Routes = lazy(() => import('config/Routes'));

let root = document.getElementById('root');

render(
  <Suspense fallback={<Spinner />}>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </Suspense>,
  root
);
