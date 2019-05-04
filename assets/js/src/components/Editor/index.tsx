import React, { Component } from 'react';
import { Editor as Slate } from 'slate-react';
import { Value } from 'slate';

import renderNode from './renderNode';
import renderMark from './renderMark';
import onKeyDown from './onKeyDown';
import plugins from './plugins';

interface Props {
  onChange: (change: { operations: any; value: Value }) => any;
  value: Value;
  readOnly: boolean;
}

type SlateRef = Slate | null;

// TODO update and add schema with fixed heading
export default class Editor extends Component<Props, {}> {
  editor!: Slate | null;

  ref = (instance: SlateRef): void => {
    this.editor = instance;
  };

  componentDidMount() {
    if (this.editor !== null) {
      this.editor.moveFocusToEndOfDocument();
    }
  }

  render() {
    let {
      ref,
      props: { onChange, value, readOnly },
    } = this;

    return (
      <Slate
        autoFocus
        autoCorrect
        spellCheck
        renderNode={renderNode}
        renderMark={renderMark}
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={value}
        ref={ref}
        plugins={plugins}
        placeholder="Start writing here..."
        readOnly={readOnly}
      />
    );
  }

  static defaultProps = {
    readOnly: false,
    onChange: () => {},
  };
}
