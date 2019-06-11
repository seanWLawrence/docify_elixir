/**
 * On backspace, if at the start of a non-paragraph, convert it back into a
 * paragraph node.
 */
var onBackspace = function (event, editor, next) {
    var value = editor.value, unwrapBlock = editor.unwrapBlock, setBlocks = editor.setBlocks;
    var _a = value.selection, isExpanded = _a.isExpanded, start = _a.start, startBlock = value.startBlock;
    if (isExpanded)
        return next();
    if (start.offset !== 0)
        return next();
    if (startBlock.type === 'paragraph')
        return next();
    event.preventDefault();
    setBlocks('paragraph');
    if (startBlock.type === 'list-item') {
        unwrapBlock('bulleted-list');
    }
};
export default onBackspace;
