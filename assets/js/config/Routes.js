import React, { lazy } from 'react';
import { Router } from '@reach/router';

// let EditDocument = lazy(() => import('../pages/EditDocument'));
// let AllDocuments = lazy(() => import('../pages/AllDocuments'));
// let DemoDocument = lazy(() => import('../pages/DemoDocument'));
// let MarkdownDocument = lazy(() => import('../pages/MarkdownDocument'));

import DemoDocument from '../pages/DemoDocument';
import AllDocuments from '../pages/AllDocuments';
import EditDocument from '../pages/EditDocument';
import MarkdownDocument from '../pages/MarkdownDocument';

export default function Routes() {
  return (
    <Router>
      <DemoDocument path="/demo" />
      <AllDocuments path="/documents" />
      <EditDocument path="/documents/edit/:documentId" />
      <MarkdownDocument path="/documents/markdown/:documentId" />
    </Router>
  );
}
