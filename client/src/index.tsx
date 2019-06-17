import 'phoenix_html';
import './scss/app.scss';

import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import Spinner from 'components/Spinner';
import client from 'config/apolloClient';

const Routes = lazy(() => import('config/Routes'));

const root = document.getElementById('root');

render(
  <Suspense fallback={<Spinner />}>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </Suspense>,
  root
);
