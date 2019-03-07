import onBackspace from './onBackspace';
import onEnter from './onEnter';

export default function onKeyDown(event, editor, next) {
  switch (event.key) {
    case 'Backspace':
      return onBackspace(event, editor, next);

    case 'Enter':
      return onEnter(event, editor, next);

    default:
      return next();
  }
}
