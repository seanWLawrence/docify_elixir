import React from 'react';
import Types from 'prop-types';

export default function Checkbox({
  editor,
  node,
  attributes,
  children,
  readOnly,
}) {
  let onChange = event =>
    editor.setNodeByKey(node.key, { data: { checked: event.target.checked } });

  let isChecked = node.data.get('checked');

  return (
    <div {...attributes}>
      <span contentEditable={false}>
        <input type="checkbox" checked={isChecked} onChange={onChange} />
      </span>
      <span
        checked={isChecked}
        contentEditable={!readOnly}
        suppressContentEditableWarning
      >
        {children}
      </span>
    </div>
  );
}

Checkbox.propTypes = {
  editor: Types.object.isRequired,
  node: Types.object.isRequired,
  attributes: Types.object.isRequired,
  children: Types.node.isRequired,
  readOnly: Types.bool,
};

Checkbox.defaultProps = {
  readOnly: false,
};

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
