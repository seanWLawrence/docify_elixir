import { ChangeEvent } from 'react';
import { Editor } from 'slate-react';

export default function AutoReplace({
  trigger,
  change,
  after,
  before,
}: {
  trigger: string | RegExp;
  trigger(string): boolean;

  change(
    change: Editor,
    _e: ChangeEvent<HTMLInputElement>,
    _matches: RegExpMatchArray
  ): void;

  after?: RegExp;

  before?: RegExp;
}): void;
