import React, { lazy, FC } from 'react';
import { Router } from '@reach/router';

let EditDocument = lazy(() => import('../pages/EditDocument'));
let AllDocuments = lazy(() => import('../pages/AllDocuments'));
let DemoDocument = lazy(() => import('../pages/DemoDocument'));

let Routes: FC<{}> = () => {
  return (
    <Router>
      <DemoDocument path="/demo" />
      <AllDocuments path="/documents" />
      <EditDocument path="/documents/edit/:documentId" />
    </Router>
  );
};

export default Routes;
