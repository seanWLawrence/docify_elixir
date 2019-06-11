import React, { lazy } from 'react';
import { Router } from '@reach/router';
var EditDocument = lazy(function () { return import('../pages/EditDocument'); });
var AllDocuments = lazy(function () { return import('../pages/AllDocuments'); });
var DemoDocument = lazy(function () { return import('../pages/DemoDocument'); });
var Routes = function () {
    return (<Router>
      <DemoDocument path="/demo"/>
      <AllDocuments path="/documents"/>
      <EditDocument path="/documents/edit/:documentId"/>
    </Router>);
};
export default Routes;
