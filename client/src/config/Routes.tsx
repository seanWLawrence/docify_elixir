import React, { lazy, FC } from 'react';
import { Router } from '@reach/router';

const EditDocument = lazy(() => import('../pages/EditDocument'));
const AllDocuments = lazy(() => import('../pages/AllDocuments'));
const DemoDocument = lazy(() => import('../pages/DemoDocument'));

const Routes: FC<{}> = () => {
  return (
    <Router>
      <DemoDocument path="/demo" />
      <AllDocuments path="/documents" />
      <EditDocument path="/documents/edit/:documentId" />
    </Router>
  );
};

export default Routes;
