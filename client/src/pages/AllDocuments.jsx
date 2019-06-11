var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import { graphql, compose, } from 'react-apollo';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';
import Document, { DocumentFragments } from 'components/Document';
import Spinner from 'components/Spinner';
import Toast from 'components/Toast';
var AllDocuments = function (_a) {
    var _b = _a.data, loading = _b.loading, error = _b.error, viewer = _b.viewer, mutate = _a.mutate;
    if (loading) {
        return <Spinner />;
    }
    if (viewer) {
        var documents = viewer.documents;
        var hasDocuments = documents.length > 0;
        return (<div>
        <CreateDocumentButton onClick={function () { return mutate(createDocument); }}/>

        {hasDocuments &&
            documents.map(function (document) { return (<Document key={document.id} document={document}/>); })}

        {!hasDocuments && <p>Let's create some documents!</p>}
      </div>);
    }
    return (<Toast message={"There was an error loading your documents. " + (error ? error.message : error)}/>);
};
export var AllDocumentsFragments = {
    viewer: gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment AllDocumentsViewer on User {\n      documents {\n        id\n        ...DocumentDocument\n      }\n    }\n    ", "\n  "], ["\n    fragment AllDocumentsViewer on User {\n      documents {\n        id\n        ...DocumentDocument\n      }\n    }\n    ", "\n  "])), DocumentFragments.document),
};
var DOCUMENTS_QUERY = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query Documents {\n    viewer {\n      ...AllDocumentsViewer\n    }\n  }\n  ", "\n"], ["\n  query Documents {\n    viewer {\n      ...AllDocumentsViewer\n    }\n  }\n  ", "\n"])), AllDocumentsFragments.viewer);
var CREATE_DOCUMENT_MUTATION = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  mutation CreateDocument {\n    createDocument {\n      document {\n        id\n      }\n    }\n  }\n"], ["\n  mutation CreateDocument {\n    createDocument {\n      document {\n        id\n      }\n    }\n  }\n"])));
var CreateDocumentButton = function (_a) {
    var onClick = _a.onClick;
    return (<button onClick={onClick}>+</button>);
};
var createDocument = {
    update: function (_cache, _a) {
        var data = _a.data;
        if (data) {
            var id = data.createDocument.document.id;
            navigate("/documents/edit/" + id);
        }
    },
};
export default compose(graphql(DOCUMENTS_QUERY), graphql(CREATE_DOCUMENT_MUTATION))(AllDocuments);
var templateObject_1, templateObject_2, templateObject_3;
