import React, { MouseEventHandler, FC } from 'react';
import {
  graphql,
  compose,
  ChildDataProps,
  ChildMutateProps,
  MutationOptions,
} from 'react-apollo';
import { DataProxy } from 'apollo-cache';
import gql from 'graphql-tag';
import { navigate, RouteComponentProps } from '@reach/router';

import Document, {
  DocumentType,
  DocumentFragments,
} from '@components/Document';
import Spinner from '@components/Spinner';
import Toast from '@components/Toast';

interface AllDocumentsDocument extends DocumentType {
  id: number;
}

type QueryResponse = {
  viewer: { documents: AllDocumentsDocument[] };
};

type MutationResponse = {
  createDocument: {
    document: {
      id: number;
    };
  };
};
type ChildProps = ChildDataProps<{}, QueryResponse, {}> &
  ChildMutateProps<{}, MutationResponse, {}> &
  RouteComponentProps;

let AllDocuments: FC<ChildProps> = ({
  data: { loading, error, viewer },
  mutate,
}) => {
  if (loading) {
    return <Spinner />;
  }

  if (viewer) {
    let { documents } = viewer;

    let hasDocuments = documents.length > 0;

    return (
      <div>
        <CreateDocumentButton onClick={() => mutate(createDocument)} />

        {hasDocuments &&
          documents.map((document: AllDocumentsDocument) => (
            <Document key={document.id} document={document} />
          ))}

        {!hasDocuments && <p>Let's create some documents!</p>}
      </div>
    );
  }

  return (
    <Toast
      message={`There was an error loading your documents. ${
        error ? error.message : error
      }`}
    />
  );
};

export const AllDocumentsFragments = {
  viewer: gql`
    fragment AllDocumentsViewer on User {
      documents {
        id
        ...DocumentDocument
      }
    }
    ${DocumentFragments.document}
  `,
};

const DOCUMENTS_QUERY = gql`
  query Documents {
    viewer {
      ...AllDocumentsViewer
    }
  }
  ${AllDocumentsFragments.viewer}
`;

const CREATE_DOCUMENT_MUTATION = gql`
  mutation CreateDocument {
    createDocument {
      document {
        id
      }
    }
  }
`;

type CreateDocumentButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

let CreateDocumentButton: FC<CreateDocumentButtonProps> = ({ onClick }) => (
  <button onClick={onClick}>+</button>
);

let createDocument: MutationOptions<MutationResponse, {}> = {
  update: (_cache: DataProxy, { data }) => {
    if (data) {
      let {
        createDocument: {
          document: { id },
        },
      } = data;

      navigate(`/documents/edit/${id}`);
    }
  },
};

export default compose(
  graphql<{}, Response, {}, ChildProps>(DOCUMENTS_QUERY),
  graphql<{}, Response, {}, ChildProps>(CREATE_DOCUMENT_MUTATION)
)(AllDocuments);
