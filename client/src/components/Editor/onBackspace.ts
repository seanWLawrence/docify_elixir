import { EventHook } from 'slate-react';
/**
 * On backspace, if at the start of a non-paragraph, convert it back into a
 * paragraph node.
 */

const onBackspace: EventHook = (event, editor, next) => {
  const { value, unwrapBlock, setBlocks } = editor;

  const {
    selection: { isExpanded, start },
    startBlock,
  } = value;

  if (isExpanded) return next();

  if (start.offset !== 0) return next();

  if (startBlock.type === 'paragraph') return next();

  event.preventDefault();

  setBlocks('paragraph');

  if (startBlock.type === 'list-item') {
    unwrapBlock('bulleted-list');
  }
};

export default onBackspace;
