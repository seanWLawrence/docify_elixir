import React from 'react';
var Checkbox = function (_a) {
    var editor = _a.editor, node = _a.node, attributes = _a.attributes, children = _a.children, _b = _a.readOnly, readOnly = _b === void 0 ? false : _b;
    var onChange = function (event) {
        editor.setNodeByKey(node.key, {
            type: 'checkbox',
            data: { checked: event.target.checked },
        });
    };
    var isChecked = node.data.get('checked');
    return (<div {...attributes}>
      <span contentEditable={false}>
        <input type="checkbox" checked={isChecked} onChange={onChange}/>
      </span>
      <input type="checkbox" checked={isChecked} contentEditable={!readOnly} suppressContentEditableWarning/>
      {children}
    </div>);
};
export default Checkbox;
// let contentStyles = isChecked =>
//   !isChecked ? styles.Content : styles['Content--Checked'];
// let container = css`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   & + & {
//     margin-top: 0;
//   }
// `;
// let content = css`
//   font-size: $font-size-body;
//   color: $color-body;
//   &:focus {
//     outline: none;
//   }
// `;
