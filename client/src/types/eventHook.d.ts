import { Editor } from 'slate';

type EventHook = (
  event: Event & { key?: string },
  editor: Editor,

  next: () => any
) => any;
