import { KeyboardEvent } from 'react';
import { Editor } from 'slate-react';
import onBackspace from './onBackspace';
import onEnter from './onEnter';

let onKeyDown = (
  event: KeyboardEvent<HTMLInputElement>,
  editor: Editor,
  next: () => any
): void => {
  switch (event.key) {
    case 'Backspace':
      return onBackspace(event, editor, next);

    case 'Enter':
      return onEnter(event, editor, next);

    default:
      return next();
  }
};

export default onKeyDown;
