import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import { Link } from '@reach/router';
import { Value } from 'slate';

import Editor from '../Editor';
import styles from './index.module.scss';

export default function Document({ document: { id, content, updatedAt } }) {
  return (
    <Link key={id} to={`/documents/edit/${id}`}>
      <div className={styles.Container}>
        <Editor readOnly value={fromGraphQl(content)} />
        <p className={styles.Date}>{toPrettyDate(updatedAt)}</p>
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

Document.propTypes = {
  document: propType(Document.fragments.document),
};

let fromGraphQl = value => Value.fromJSON(JSON.parse(value));

let toPrettyDate = date => new Date(date).toLocaleDateString('en-US');
