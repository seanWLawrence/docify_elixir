import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import { Value } from 'slate';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { fromSlate, toSlate } from '../components/Editor/htmlSerializer';
import Spinner from '../components/Spinner';

let MarkdownDocument = ({ data: { loading, error, document } }) => {
  if (error) {
    return null;
  }

  if (loading) {
    return <Spinner />;
  }

  let { content } = document;

  return <p>{toSlate(Value.fromJSON(JSON.parse(content)))}</p>;
};

MarkdownDocument.fragments = {
  document: gql`
    fragment MarkdownDocumentDocument on Document {
      id
      content
    }
  `,
};

const DOCUMENT_QUERY = gql`
  query DocumentQuery($documentId: ID!) {
    document(documentId: $documentId) {
      ...MarkdownDocumentDocument
    }
  }
  ${MarkdownDocument.fragments.document}
`;

let withData = graphql(DOCUMENT_QUERY, {
  options({ documentId }) {
    return { variables: { documentId } };
  },
})(MarkdownDocument);

export default hot(withData);
