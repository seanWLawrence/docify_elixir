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

import Document, { DocumentType, DocumentFragments } from 'components/Document';
import Spinner from 'components/Spinner';
import Toast from 'components/Toast';

interface AllDocumentsDocument extends DocumentType {
  id: number;
}

interface QueryResponse {
  viewer: { documents: AllDocumentsDocument[] };
}

interface MutationResponse {
  createDocument: {
    document: {
      id: number;
    };
  };
}
type ChildProps = ChildDataProps<{}, QueryResponse, {}> &
  ChildMutateProps<{}, MutationResponse, {}> &
  RouteComponentProps;

const createDocument: MutationOptions<MutationResponse, {}> = {
  update: (_cache: DataProxy, { data }) => {
    if (data) {
      const {
        createDocument: {
          document: { id },
        },
      } = data;

      navigate(`/documents/edit/${id}`);
    }
  },
};

const AllDocuments: FC<ChildProps> = ({
  data: { loading, error, viewer },
  mutate,
}) => {
  if (loading) {
    return <Spinner />;
  }

  if (viewer) {
    const { documents } = viewer;

    const hasDocuments = documents.length > 0;

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

interface CreateDocumentButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const CreateDocumentButton: FC<CreateDocumentButtonProps> = ({ onClick }) => (
  <button onClick={onClick}>+</button>
);

export default compose(
  graphql<{}, Response, {}, ChildProps>(DOCUMENTS_QUERY),
  graphql<{}, Response, {}, ChildProps>(CREATE_DOCUMENT_MUTATION)
)(AllDocuments);
