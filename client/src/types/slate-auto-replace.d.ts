declare module 'slate-auto-replace' {
  import { ChangeEvent } from 'react';

  import { Editor, Plugin } from 'slate-react';

  export default function AutoReplace({
    trigger,
    change,
    after,
    before,
  }: {
    trigger: string | RegExp;

    change(
      change: Editor,
      _e: ChangeEvent<HTMLInputElement>,
      _matches: RegExpMatchArray
    ): void;

    after?: RegExp;

    before?: RegExp;
  }): Plugin;
}
