import React from 'react';
import Types from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { propType, filter } from 'graphql-anywhere';
import { navigate } from '@reach/router';

import Document from '../components/Document';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';
import styles from './AllDocuments.module.scss';

let AllDocuments = ({ data: { loading, error, viewer }, mutate }) => {
  if (error) {
    return (
      <Toast
        isVisible
        message={`There was an error loading your documents. ${error.message}`}
      />
    );
  }

  if (loading) {
    return <Spinner isLoading />;
  }

  let { documents } = viewer;

  let hasDocuments = documents.length > 0;

  console.log(documents);

  return (
    <div className={styles.Container}>
      <CreateDocumentButton onClick={() => mutate(createDocument)} />

      {hasDocuments &&
        documents.map(document => (
          <Document
            key={document.id}
            document={filter(Document.fragments.document, document)}
          />
        ))}

      {!hasDocuments && <p>Let's create some documents!</p>}
    </div>
  );
};

AllDocuments.fragments = {
  viewer: gql`
    fragment AllDocumentsViewer on User {
      documents {
        id
        ...DocumentDocument
      }
    }
    ${Document.fragments.document}
  `,
};

AllDocuments.propTypes = {
  data: Types.shape({
    viewer: propType(AllDocuments.fragments.viewer),
    loading: Types.bool,
    error: Types.object,
  }),
  mutate: Types.func.isRequired,
};

const DOCUMENTS_QUERY = gql`
  query Documents {
    viewer {
      ...AllDocumentsViewer
    }
  }
  ${AllDocuments.fragments.viewer}
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

let CreateDocumentButton = ({ onClick }) => (
  <button className={styles['Button--CreateNew']} onClick={onClick}>
    +
  </button>
);

let createDocument = {
  update(
    _cache,
    {
      data: {
        createDocument: {
          document: { id },
        },
      },
    }
  ) {
    if (id) {
      navigate(`/documents/edit/${id}`);
    }
  },
};

export default compose(
  graphql(DOCUMENTS_QUERY),
  graphql(CREATE_DOCUMENT_MUTATION)
)(AllDocuments);
