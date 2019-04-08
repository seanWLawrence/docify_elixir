import React from 'react';
import Html, { Rule } from 'slate-html-serializer';
import { isUndefined } from 'lodash';
import { Value } from 'slate';

import { ValueOf } from '@utils/types';

export interface BlockType {
  blockquote: 'block-quote';
  ul: 'bulleted-list';
  ol: 'numbered-list';
  li: 'list-item';
  h1: 'heading1';
  h2: 'heading2';
  h3: 'heading3';
  h4: 'heading4';
  h5: 'heading5';
  h6: 'heading6';
  p: 'paragraph';
  iframe: 'embed';
  img: 'image';
  a: 'link';
  hr: 'horizontal-rule';
}

export type BlockTypeKey = keyof BlockType;

export type BlockTypeValue = ValueOf<BlockType>;

export interface InlineType {
  strong: 'bold';
  code: 'code';
  em: 'italic';
  u: 'underlined';
  del: 'deleted';
  mark: 'added';
}

export type InlineTypeKey = keyof InlineType;

export type InlineTypeValue = ValueOf<InlineType>;

const BLOCK_TYPE: BlockType = {
  blockquote: 'block-quote',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  li: 'list-item',
  h1: 'heading1',
  h2: 'heading2',
  h3: 'heading3',
  h4: 'heading4',
  h5: 'heading5',
  h6: 'heading6',
  p: 'paragraph',
  iframe: 'embed',
  img: 'image',
  a: 'link',
  hr: 'horizontal-rule',
};

const INLINE_TYPE: InlineType = {
  strong: 'bold',
  code: 'code',
  em: 'italic',
  u: 'underlined',
  del: 'deleted',
  mark: 'added',
};

let isBlockTypeKey = (str: string): boolean =>
  Object.keys(BLOCK_TYPE).includes(str);

let isInlineTypeKey = (str: string): boolean =>
  Object.keys(INLINE_TYPE).includes(str);

let isBlockType = (
  htmlElementType: BlockTypeKey | string
): void | BlockTypeValue =>
  isBlockTypeKey(htmlElementType)
    ? BLOCK_TYPE[htmlElementType as BlockTypeKey]
    : void 0;

let isInlineType = (
  htmlElementType: InlineTypeKey | string
): void | InlineTypeValue =>
  isInlineTypeKey(htmlElementType)
    ? INLINE_TYPE[htmlElementType as InlineTypeKey]
    : void 0;

let rules: Rule[] = [
  {
    deserialize(el, next) {
      let htmlElementType = el.tagName.toLowerCase();

      if (isBlockType(htmlElementType)) {
        return {
          object: 'block',
          type: htmlElementType,
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        };
      } else if (isInlineType(htmlElementType)) {
        return {
          object: 'mark',
          type: htmlElementType,
          nodes: next(el.childNodes),
        };
      }

      return void 0;
    },

    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'paragraph':
            return <p>{children}</p>;

          case 'bulleted-list':
            return <ul>{children}</ul>;

          case 'numbered-list':
            return <ol>{children}</ol>;

          case 'list-item':
            return <li>{children}</li>;

          case 'heading1':
            return <h1>{children}</h1>;

          case 'heading2':
            return <h2>{children}</h2>;

          case 'heading3':
            return <h3>{children}</h3>;

          case 'heading4':
            return <h4>{children}</h4>;

          case 'heading5':
            return <h5>{children}</h5>;

          case 'heading6':
            return <h6>{children}</h6>;

          case 'block-quote':
            return <blockquote>{children}</blockquote>;

          case 'code':
            return <code>{children}</code>;

          case 'horizontal-rule':
            return <hr />;

          case 'image':
            return <img src={obj.src} alt={obj.alt} />;

          case 'link':
            return (
              <a href={obj.href} title={obj.title}>
                {obj.children}
              </a>
            );

          // TODO
          case 'table':
            return <table>{children}</table>;

          case 'table-row':
            return <tr>{children}</tr>;

          case 'table-head':
            return <th>{children}</th>;

          case 'table-cell':
            return <td>{children}</td>;

          default:
            return <p>{children}</p>;
        }
      } else if (obj.type === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;

          case 'code':
            return <code>{children}</code>;

          case 'italic':
            return <em>{children}</em>;

          case 'deleted':
            return <del>{children}</del>;

          case 'added':
            return <mark>{children}</mark>;
        }
      }

      return void 0;
    },
  },
];

let htmlSerializer = new Html({ rules });

export let toSlate = (content: string): Value =>
  htmlSerializer.deserialize(content);

export let fromSlate = (content: Value): string =>
  htmlSerializer.serialize(content);
