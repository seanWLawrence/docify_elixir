import React, { Component } from 'react';
import Types from 'prop-types';
import { debounce } from 'lodash';
import { graphql, compose } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import { Value } from 'slate';

import Editor from '../components/Editor';
import Toast from '../components/Toast';
import Spinner from '../components/Spinner';
import styles from './EditDocument.module.scss';

export class EditDocument extends Component {
  state = {
    content: null,
    toastIsVisible: false,
  };

  onChange = ({ value }) => {
    let {
      props: { documentId, mutate },
      state: { content },
    } = this;

    let self = this;

    if (content && value.document != content.document) {
      let debouncedMutation = debounce(mutate, SAVE_INTERVAL_IN_MILLISECONDS);

      debouncedMutation({
        variables: { documentId, content: toGraphQl(value) },
        update() {
          self.setState({ toastIsVisible: true }, function() {
            setTimeout(function() {
              self.setState({ toastIsVisible: false }),
                TOAST_DISPLAY_LENGTH_IN_MILLISECONDS;
            });
          });
        },
      });
    }

    this.setState({ content: value });
  };

  render() {
    let {
      props: {
        data: { loading, error, document },
      },
      state: { content: stateContent, toastIsVisible },
      onChange,
    } = this;

    if (error) {
      return (
        <Toast
          isVisible
          message={`There was an error loading your document. ${error.message}`}
        />
      );
    }

    if (loading) {
      return <Spinner isLoading />;
    }

    let { content: queryContent } = document;

    return (
      <div className={styles.Container}>
        <Editor
          value={stateContent || fromGraphQl(queryContent)}
          onChange={onChange}
        />

        <Toast isVisible={toastIsVisible} message="Saved successfully!" />
      </div>
    );
  }

  static fragments = {
    document: gql`
      fragment EditDocumentDocument on Document {
        id
        content
      }
    `,
  };

  static propTypes = {
    documentId: Types.string.isRequired,
    data: Types.shape({
      loading: Types.bool,
      error: Types.object,
      document: propType(EditDocument.fragments.document),
    }).isRequired,
  };
}

let fromGraphQl = value => Value.fromJSON(JSON.parse(value));
let toGraphQl = value => JSON.stringify(value.toJSON());

const SAVE_INTERVAL_IN_MILLISECONDS = 1000;
const TOAST_DISPLAY_LENGTH_IN_MILLISECONDS = 3000;

const DOCUMENT_QUERY = gql`
  query DocumentQuery($documentId: ID!) {
    document(documentId: $documentId) {
      ...EditDocumentDocument
    }
  }
  ${EditDocument.fragments.document}
`;

const EDIT_DOCUMENT_MUTATION = gql`
  mutation UpdateDocument($documentId: ID!, $content: String!) {
    updateDocumentContent(documentId: $documentId, content: $content) {
      document {
        id
        content
      }
    }
  }
`;

export default compose(
  graphql(DOCUMENT_QUERY, {
    options({ documentId }) {
      return { variables: { documentId } };
    },
  }),
  graphql(EDIT_DOCUMENT_MUTATION)
)(EditDocument);
