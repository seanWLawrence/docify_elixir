import React, { Component } from 'react';
import Types from 'prop-types';
import { Editor as Slate } from 'slate-react';

import renderNode from './renderNode';
import renderMark from './renderMark';
import onKeyDown from './onKeyDown';
import plugins from './plugins';

// TODO update and add schema with fixed heading
export default class Editor extends Component {
  ref = editor => {
    this.editor = editor;
  };

  componentDidMount() {
    this.editor.moveFocusToEndOfDocument();
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

  static propTypes = {
    value: Types.object.isRequired,
    onChange: Types.func,
    readOnly: Types.bool,
  };

  static defaultProps = {
    readOnly: false,
    onChange: () => {},
  };
}
