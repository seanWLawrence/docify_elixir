import React, { ReactElement, FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { hot } from 'react-hot-loader/root';
import { Value } from 'slate';
import gql from 'graphql-tag';
import { graphql, ChildDataProps } from 'react-apollo';

import { fromSlate } from '@components/Editor/htmlSerializer';
import Spinner from '@components/Spinner';
type Document = {
  content: string;
};

type Response = {
  document: Document;
};

type InputProps = {
  documentId: string;
};

type Variables = {
  documentId: string;
};

type ChildProps = ChildDataProps<InputProps, Response, Variables> &
  RouteComponentProps;

let MarkdownDocument: FC<ChildProps> = ({
  data: { loading, error, document },
}: ChildProps): ReactElement | null => {
  if (loading) {
    return <Spinner />;
  }

  if (document) {
    let { content } = document;

    return <p>{fromSlate(Value.fromJSON(JSON.parse(content)))}</p>;
  }

  console.error(error);

  return null;
};

export const MarkdownDocumentFragments = {
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
  ${MarkdownDocumentFragments.document}
`;

let withData = graphql<InputProps, Response, Variables, ChildProps>(
  DOCUMENT_QUERY,
  {
    options({ documentId }: { documentId: string }) {
      return { variables: { documentId } };
    },
  }
)(MarkdownDocument);

export default hot(withData);
