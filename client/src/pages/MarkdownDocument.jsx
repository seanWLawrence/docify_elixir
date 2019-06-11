var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Value } from 'slate';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { fromSlate } from 'components/Editor/htmlSerializer';
import Spinner from 'components/Spinner';
var MarkdownDocument = function (_a) {
    var _b = _a.data, loading = _b.loading, error = _b.error, document = _b.document;
    if (loading) {
        return <Spinner />;
    }
    if (document) {
        var content = document.content;
        return <p>{fromSlate(Value.fromJSON(JSON.parse(content)))}</p>;
    }
    console.error(error);
    return null;
};
export var MarkdownDocumentFragments = {
    document: gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment MarkdownDocumentDocument on Document {\n      id\n      content\n    }\n  "], ["\n    fragment MarkdownDocumentDocument on Document {\n      id\n      content\n    }\n  "]))),
};
var DOCUMENT_QUERY = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query DocumentQuery($documentId: ID!) {\n    document(documentId: $documentId) {\n      ...MarkdownDocumentDocument\n    }\n  }\n  ", "\n"], ["\n  query DocumentQuery($documentId: ID!) {\n    document(documentId: $documentId) {\n      ...MarkdownDocumentDocument\n    }\n  }\n  ", "\n"])), MarkdownDocumentFragments.document);
var withData = graphql(DOCUMENT_QUERY, {
    options: function (_a) {
        var documentId = _a.documentId;
        return { variables: { documentId: documentId } };
    },
})(MarkdownDocument);
export default hot(withData);
var templateObject_1, templateObject_2;
