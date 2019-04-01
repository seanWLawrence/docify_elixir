import React from 'react';
import gql from 'graphql-tag';
import { Link } from '@reach/router';
import { Value } from 'slate';

import Editor from './Editor';

export default function Document({ document: { id, content, updatedAt } }) {
  return (
    <Link key={id} to={`/documents/edit/${id}`}>
      <div>
        <Editor readOnly value={fromGraphQl(content)} />
        <p>{toPrettyDate(updatedAt)}</p>
      </div>
    </Link>
  );
}

Document.fragments = {
  document: gql`
    fragment DocumentDocument on Document {
      id
      content
      updatedAt
    }
  `,
};

let fromGraphQl = value => Value.fromJSON(JSON.parse(value));

let toPrettyDate = date => new Date(date).toLocaleDateString('en-US');
