import React, { ReactNode, FC, ChangeEvent } from 'react';
import { Editor, Block, Inline } from 'slate';
import { RenderAttributes } from 'slate-react';
interface Props {
  editor: Editor;
  node: Block | Inline;
  attributes: RenderAttributes;
  children: ReactNode;
  readOnly?: boolean;
}

const Checkbox: FC<Props> = ({
  editor,
  node,
  attributes,
  children,
  readOnly = false,
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    editor.setNodeByKey(node.key, {
      type: 'checkbox',
      data: { checked: (event.target as HTMLInputElement).checked },
    });
  };

  const isChecked: boolean = node.data.get('checked');

  return (
    <div {...attributes}>
      <span contentEditable={false}>
        <input type="checkbox" checked={isChecked} onChange={onChange} />
      </span>
      <input
        type="checkbox"
        checked={isChecked}
        contentEditable={!readOnly}
        suppressContentEditableWarning
      />
      {children}
    </div>
  );
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
