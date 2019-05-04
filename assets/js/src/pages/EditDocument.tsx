import React, { Component } from 'react';
import { debounce, isUndefined, get } from 'lodash';
import {
  graphql,
  compose,
  ChildMutateProps,
  ChildDataProps,
} from 'react-apollo';
import gql from 'graphql-tag';
import { Value } from 'slate';
import { RouteComponentProps } from '@reach/router';

import Editor from '@components/Editor';
import Toast from '@components/Toast';
import Spinner from '@components/Spinner';
type Props = {
  documentId: number;
} & RouteComponentProps;

type QueryInputProps = {
  documentId: number;
};

type QueryResponse = {
  document: {
    id: number;
    content: string;
  };
};

type QueryVariables = QueryInputProps;

type MutationInputProps = {
  documentId: number;
  content: string;
};

type MutationReponse = {
  updateDocumentContent: {
    document: {
      id: number;
      content: string;
    };
  };
};

type MutationVariables = MutationInputProps;

type ChildProps = ChildMutateProps<
  MutationInputProps,
  MutationReponse,
  MutationVariables
> &
  ChildDataProps<QueryInputProps, QueryResponse, QueryVariables> &
  Props;

const SAVE_INTERVAL_IN_MILLISECONDS = 3000;

class EditDocument extends Component<
  ChildProps,
  { documentContent: Value | null; toastIsVisible: boolean }
> {
  state = {
    documentContent: null,
    toastIsVisible: false,
  };

  debouncedMutation = debounce(
    this.props.mutate,
    SAVE_INTERVAL_IN_MILLISECONDS
  );

  onChange = ({ value }: { value: Value }): void => {
    if (
      this.state.documentContent &&
      value.document !== get(this.state.documentContent, 'document')
    ) {
      let self = this;

      this.debouncedMutation({
        variables: {
          documentId: this.props.documentId,
          content: toGraphQl(value),
        },
        update() {
          self.setState({ toastIsVisible: true });

          setTimeout(() => {
            self.setState({ toastIsVisible: false }),
              TOAST_DISPLAY_LENGTH_IN_MILLISECONDS;
          });
        },
      });
    }

    this.setState({ documentContent: value });
  };
  render() {
    let {
      props: {
        data: { loading, error, document },
      },
      state: { documentContent: stateDocumentContent, toastIsVisible },
      onChange,
    } = this;

    if (loading) {
      return <Spinner />;
    }

    if (!isUndefined(document)) {
      let { content: queryContent } = document;

      return (
        <div>
          <Editor
            value={stateDocumentContent || fromGraphQl(queryContent)}
            onChange={onChange}
          />

          {toastIsVisible && <Toast message="Saved successfully!" />}
        </div>
      );
    }

    return (
      <Toast
        message={`There was an error loading your document. ${
          error ? error.message : error
        }`}
      />
    );
  }
}

let EditDocumentFragments = {
  document: gql`
    fragment EditDocumentDocument on Document {
      id
      content
    }
  `,
};

let fromGraphQl = (value: string): Value => Value.fromJSON(JSON.parse(value));
let toGraphQl = (value: Value): string => JSON.stringify(value.toJSON());

const TOAST_DISPLAY_LENGTH_IN_MILLISECONDS = 3000;

const DOCUMENT_QUERY = gql`
  query DocumentQuery($documentId: ID!) {
    document(documentId: $documentId) {
      ...EditDocumentDocument
    }
  }
  ${EditDocumentFragments.document}
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
  graphql<QueryInputProps, QueryResponse, QueryVariables, ChildProps>(
    DOCUMENT_QUERY,
    {
      options({ documentId }) {
        return { variables: { documentId } };
      },
    }
  ),
  graphql<MutationInputProps, MutationReponse, MutationVariables, ChildProps>(
    EDIT_DOCUMENT_MUTATION
  )
)(EditDocument);
