import React, { FC } from 'react';
import gql from 'graphql-tag';
import { Link } from '@reach/router';
import { Value } from 'slate';

import Editor from './Editor';

export interface DocumentType {
  id: number;
  content: string;
  updatedAt: Date;
}

type Props = {
  document: DocumentType;
};

let Document: FC<Props> = ({ document: { id, content, updatedAt } }) => {
  return (
    <Link key={id} to={`/documents/edit/${id}`}>
      <div>
        <Editor readOnly value={fromGraphQl(content)} />
        <p>{toPrettyDate(updatedAt)}</p>
      </div>
    </Link>
  );
};

export const DocumentFragments = {
  document: gql`
    fragment DocumentDocument on Document {
      id
      content
      updatedAt
    }
  `,
};

export default Document;

let fromGraphQl = (value: string): Value => Value.fromJSON(JSON.parse(value));

let toPrettyDate = (date: Date): string =>
  new Date(date).toLocaleDateString('en-US');
