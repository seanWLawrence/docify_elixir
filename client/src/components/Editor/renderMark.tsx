import React, { ReactNode } from 'react';
import { RenderMarkProps } from 'slate-react';
import { Editor } from 'slate';

export default function renderMark(
  props: RenderMarkProps,
  _editor: Editor,
  next: () => void
): ReactNode | void {
  const {
    children,
    mark: { type },
    attributes,
  } = props;

  switch (type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>;

    case 'code':
      return <code {...attributes}>{children}</code>;

    case 'italic':
      return <em {...attributes}>{children}</em>;

    case 'underlined':
      return <u {...attributes}>{children}</u>;

    case 'deleted':
      return <del {...attributes}>{children}</del>;

    case 'added':
      return <mark {...attributes}>{children}</mark>;

    default: {
      return next();
    }
  }
}
