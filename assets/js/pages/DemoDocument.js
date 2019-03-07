import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import Editor from '../components/Editor';
import { toSlate } from '../components/Editor/htmlSerializer';
import demoContent from '../components/Editor/_demoFixture';
import styles from './DemoDocument.module.scss';

class DemoDocument extends Component {
  state = {
    content: toSlate(demoContent),
  };

  onChange = ({ value }) => this.setState({ content: value });

  render() {
    let {
      state: { content },
      onChange,
    } = this;

    return (
      <div className={styles.Container}>
        <Editor value={content} className={styles.Base} onChange={onChange} />
      </div>
    );
  }
}

export default hot(DemoDocument);
