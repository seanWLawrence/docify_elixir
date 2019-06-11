import AutoReplace from 'slate-auto-replace';
import NoEmpty from 'slate-no-empty';
import CollapseOnEscape from 'slate-collapse-on-escape';
import isHotKey from 'is-hotkey';
import { Plugin } from 'slate-react';
import {
  defaultTo,
  first,
  split,
  last,
  isEqual,
  pipe,
  getOr,
  tail,
  join,
  stubTrue,
  cond,
  includes,
} from 'lodash/fp';
import { CurriedFunction1 } from 'lodash';

import { InlineType } from 'components/Editor/htmlSerializer';
import { ValueOf } from 'utils/types';

type MarkHotKey = ({
  type,
  key,
}: {
  type: ValueOf<InlineType>;
  key: string;
}) => Plugin;

let MarkHotkey: MarkHotKey = ({ type, key }) => {
  return {
    onKeyDown(event, editor, next) {
      if (isHotKey(key, event as KeyboardEvent)) {
        event.preventDefault();

        return editor.toggleMark(type);
      }

      return next();
    },
  };
};

export default [
  CollapseOnEscape(),

  NoEmpty('paragraph'),

  // adds bold on 'command + b'
  MarkHotkey({ key: 'mod+b', type: 'bold' }),

  // adds underlined on 'command + u'
  MarkHotkey({ key: 'mod+u', type: 'underlined' }),

  // adds italic on 'command + i'
  MarkHotkey({ key: 'mod+i', type: 'italic' }),

  // adds code on 'control + `'
  MarkHotkey({ key: 'ctrl+`', type: 'code' }),

  // adds deleted on 'control + shift + `'
  MarkHotkey({ key: 'ctrl+shift+`', type: 'deleted' }),

  // inserts block quote with '>'
  AutoReplace({
    trigger: 'space',
    before: /^(>)$/,
    change: (change, _e, _matches) => {
      return change.setBlocks({ type: 'block-quote' });
    },
  }),

  // inserts h1 with '#'
  AutoReplace({
    trigger: 'space',
    before: /^(#)$/,
    change: (change, _e, _matches) => {
      return change.setBlocks({ type: 'heading1' });
    },
  }),

  // inserts h2 with '##'
  AutoReplace({
    trigger: 'space',
    before: /^(##)$/,
    change: (change, _e, _matches) => {
      return change.setBlocks({ type: 'heading2' });
    },
  }),

  // inserts h3 with '###'
  AutoReplace({
    trigger: 'space',
    before: /^(###)$/,
    change: (change, _e, _matches) => {
      return change.setBlocks({ type: 'heading3' });
    },
  }),

  // inserts h4 with '####'
  AutoReplace({
    trigger: 'space',
    before: /^(####)$/,
    change: (change, _e, _matches) => {
      return change.setBlocks({ type: 'heading4' });
    },
  }),

  // inserts h5 with '#####'
  AutoReplace({
    trigger: 'space',
    before: /^(#####)$/,
    change: (change, _e, _matches) => {
      return change.setBlocks({ type: 'heading5' });
    },
  }),

  // inserts h6 with '######'
  AutoReplace({
    trigger: 'space',
    before: /^(######)$/,
    change: (change, _e, _matches) => {
      return change.setBlocks({ type: 'heading6' });
    },
  }),

  // inserts bulleted list with li when '-', '+', or '*' are typed
  AutoReplace({
    trigger: 'space',
    before: /^(-|\+|\*)$/,
    change: (change, _e, _matches) => {
      change.setBlocks({ type: 'list-item' });

      return change.wrapBlock('bulleted-list');
    },
  }),

  // inserts numbered list with li when '[number].' are typed
  AutoReplace({
    trigger: 'space',
    before: /^([1-9]\.)$/,
    change: (change, _e, _matches) => {
      change.setBlocks({ type: 'list-item' });

      return change.wrapBlock('numbered-list');
    },
  }),

  // adds unchecked checkbox on '[]'
  AutoReplace({
    trigger: 'space',
    before: /^(\[\])$/,
    change: (change, _e, _matches) => {
      change.setBlocks({ type: 'todo-list', data: { checked: false } });
    },
  }),

  // adds checked checkbox on '[x]'
  AutoReplace({
    trigger: 'space',
    before: /^(\[x\])$/,
    change: (change, _e, _matches) => {
      change.setBlocks({ type: 'todo-list', data: { checked: true } });
    },
  }),

  // formats inline code with '`'
  AutoReplace({
    trigger: '`',
    before: /.|^/,
    change: (change, _e, _matches) => change.toggleMark({ type: 'code' }),
  }),

  // formats code blocks with '```'
  AutoReplace({
    trigger: '```',
    before: /.|^/,
    change: (change, _e, _matches) => change.setBlocks({ type: 'code' }),
  }),

  // format bold or italic with '*' or '**'
  AutoReplace({
    trigger: '*',
    before: /.|^/,
    change: (change, _e, matches) => {
      let isItalic = change.value.marks.some(mark =>
        isEqual(mark!.type, 'italic')
      );

      change.toggleMark({ type: 'italic' });

      if (!isStartOfWord(matches) && !isItalic) {
        return change.toggleMark({ type: 'bold' });
      }

      if (isStartOfWord(matches) && isItalic) {
        return change.replaceMark('italic', 'bold');
      }

      return void 0;
    },
  }),

  // format bold or italic with '_' or '__'
  AutoReplace({
    trigger: '_',
    before: /.|^/,
    change: (change, _e, matches) => {
      let isItalic = pipe(
        (getOr('', 'type') as unknown) as CurriedFunction1<
          { type: string } | undefined,
          string
        >,
        isEqual('italic')
      );

      let hasItalicMark = change.value.marks.some(isItalic);

      change.toggleMark({ type: 'italic' });

      if (!isStartOfWord(matches) && !hasItalicMark) {
        return change.toggleMark({ type: 'bold' });
      }

      if (isStartOfWord(matches) && hasItalicMark) {
        return change.replaceMark('italic', 'bold');
      }

      return void 0;
    },
  }),

  // format marked or strikethrough with '~' or '~~'
  AutoReplace({
    trigger: '~',
    before: /.|^/,
    change: (change, _e, matches) => {
      let isMarked = pipe(
        (getOr('', 'type') as unknown) as CurriedFunction1<
          { type: string } | undefined,
          string
        >,
        isEqual('added')
      );

      let hasMarks = change.value.marks.some(isMarked);

      change.toggleMark({ type: 'added' });

      if (!isStartOfWord(matches) && !hasMarks) {
        return change.toggleMark({ type: 'deleted' });
      }

      if (isStartOfWord(matches) && hasMarks) {
        return change.replaceMark('added', 'deleted');
      }

      return void 0;
    },
  }),

  // create links on '[link text](href)' or images on '![alt text](src)'
  AutoReplace({
    trigger: 'space',
    before: /(!?\[.*\]\(.*\))/i,
    change: (change, _e, matches) =>
      change
        .insertText(` ${title(matches)}`)
        .moveFocusBackward(title(matches).length)
        .wrapInline(imageOrLink(matches))
        .moveToEnd()
        .insertText(' '),
  }),

  // creates <hr /> with '---' or '***' or '===' on 'space'
  AutoReplace({
    trigger: 'space',
    before: /^(---|===|\*\*\*)/,
    change: (change, _e, _matches) =>
      change.wrapBlock({ type: 'horizontal-rule' }),
  }),

  // creates <hr /> with '---' or '***' or '===' on 'enter'
  AutoReplace({
    trigger: 'enter',
    before: /^(---|===|\*\*\*)/,
    change: (change, _e, _matches) =>
      change.wrapBlock({ type: 'horizontal-rule' }),
  }),

  // create plugins on 'embed()'
  AutoReplace({
    trigger: 'space',
    before: /(embed\(.*\))/i,
    change: (change, _e, matches) => {
      change.insertBlock({
        type: 'embed',
        data: { src: embedSrc(matches) },
      });
    },
  }),
];

type CurriedRegExpMatchArray = CurriedFunction1<RegExpMatchArray, string>;

let lastCharacter = pipe(
  (getOr('', 'before.input') as unknown) as CurriedRegExpMatchArray,
  last
);

let isStartOfWord = pipe(
  (lastCharacter as unknown) as CurriedRegExpMatchArray,
  isEqual(' ')
);

let splitLink = pipe(
  (getOr('', 'before[0]') as unknown) as CurriedRegExpMatchArray,
  split('](')
);

let title = pipe(
  (splitLink as unknown) as CurriedRegExpMatchArray,
  first,
  tail,
  join('')
);

let href = pipe(
  splitLink,
  last,
  defaultTo(''),
  split(')'),
  first,
  defaultTo('')
);

let alt = pipe(
  splitLink,
  first,
  tail,
  tail,
  join('')
);

let src = href;

let iframeSrc = pipe(
  (getOr('', 'before[0]') as unknown) as CurriedRegExpMatchArray,
  pipe(
    split('src="'),
    last,
    defaultTo(''),
    split('"'),
    first
    // defaultTo('')
  )
);

let isImage = pipe(
  (getOr('', 'before[0]') as unknown) as CurriedRegExpMatchArray,
  includes('!')
);

type ImageData = { type: 'image'; data: { src: string; alt: string } };

type ImageDataFn = (matches: RegExpMatchArray) => ImageData;

let imageData: ImageDataFn = matches => ({
  type: 'image',
  data: { src: src(matches), alt: alt(matches) },
});

type LinkData = { type: 'link'; data: { href: string; title: string } };

type LinkDataFn = (matches: RegExpMatchArray) => LinkData;

let linkData: LinkDataFn = matches => ({
  type: 'link',
  data: { href: href(matches), title: title(matches) },
});

let imageOrLink = cond<RegExpMatchArray, ImageData | LinkData>([
  [isImage, imageData],
  [stubTrue, linkData],
]);

let isIframe = pipe(
  (getOr('', 'before[0]') as unknown) as CurriedRegExpMatchArray,
  includes('src')
);

let stripEmbedTag = pipe(
  (getOr('', 'before[0]') as unknown) as CurriedRegExpMatchArray,
  split('embed('),
  last,
  defaultTo(''),
  split(')'),
  first
);

let embedSrc = cond([[isIframe, iframeSrc], [stubTrue, stripEmbedTag]]);
