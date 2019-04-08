import React, { useState, FC } from 'react';
import { debounce, isUndefined } from 'lodash';
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

type State = {
  content: Value | null;
  toastIsVisible: boolean;
};

let EditDocument: FC<ChildProps> = ({
  documentId,
  mutate,
  data: { loading, error, document },
}) => {
  let [stateDocument, setDocument] = useState<State>({
    content: null,
    toastIsVisible: false,
  });

  let onChange = ({ value }: { value: Value }): void => {
    let { content } = stateDocument;

    if (content && value.document !== content.document) {
      let debouncedMutation = debounce(mutate, SAVE_INTERVAL_IN_MILLISECONDS);

      debouncedMutation({
        variables: { documentId, content: toGraphQl(value) },
        update() {
          setDocument({ ...stateDocument, toastIsVisible: true });

          setTimeout(() => {
            setDocument({ ...stateDocument, toastIsVisible: false }),
              TOAST_DISPLAY_LENGTH_IN_MILLISECONDS;
          });
        },
      });
    }

    setDocument({ ...stateDocument, content: value });
  };

  if (loading) {
    return <Spinner />;
  }

  if (!isUndefined(document)) {
    let { content: queryContent } = document;

    return (
      <div>
        <Editor
          value={stateDocument.content || fromGraphQl(queryContent)}
          onChange={onChange}
        />

        <Toast message="Saved successfully!" />
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
};

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

const SAVE_INTERVAL_IN_MILLISECONDS = 1000;
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
