import React, { Component } from 'react';
import { Editor as Slate } from 'slate-react';
import { EditorProperties } from 'slate';

import renderNode from './renderNode';
import renderMark from './renderMark';
import onKeyDown from './onKeyDown';
import plugins from './plugins';
import defaultValue from './defaultValue';

type SlateRef = Slate | null;

// TODO update and add schema with fixed heading
export default class Editor extends Component<EditorProperties, {}> {
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
    const {
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
        value={value || defaultValue}
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
