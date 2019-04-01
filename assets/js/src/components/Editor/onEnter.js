import onBackspace from './onBackspace';
/**
 * On return, if at the end of a node type that should not be extended,
 * create a new paragraph below it.
 */

export default function onEnter(event, editor, next) {
  let { value, splitBlock } = editor;

  let {
    selection: { start, end, isExpanded },
    startBlock,
  } = value;

  if (isExpanded) return next();

  if (start.offset === 0 && startBlock.text.length === 0)
    return onBackspace(event, editor, next);

  if (end.offset !== startBlock.text.length) return next();

  if (
    startBlock.type !== 'heading-one' &&
    startBlock.type !== 'heading-two' &&
    startBlock.type !== 'heading-three' &&
    startBlock.type !== 'heading-four' &&
    startBlock.type !== 'heading-five' &&
    startBlock.type !== 'heading-six' &&
    startBlock.type !== 'block-quote'
    // startBlock.type != 'horizontal-rule'
  ) {
    return next();
  }

  event.preventDefault();

  splitBlock(1).setBlocks('paragraph');
}
