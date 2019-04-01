import React from 'react';
import Html from 'slate-html-serializer';

import Checkbox from '../Checkbox';

const BLOCK_TYPES = {
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

const INLINE_TYPES = {
  strong: 'bold',
  code: 'code',
  em: 'italic',
  u: 'underlined',
  del: 'deleted',
  mark: 'added',
};

let rules = [
  {
    deserialize(el, next) {
      let type = BLOCK_TYPES[el.tagName.toLowerCase()];

      if (type) {
        return {
          object: 'block',
          type,
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        };
      }
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

          case 'todo-list':
            return <Checkbox />;

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
      }
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      let type = INLINE_TYPES[el.tagName.toLowerCase()];

      if (type) {
        return {
          object: 'mark',
          type,
          nodes: next(el.childNodes),
        };
      }
    },

    serialize(obj, children) {
      if (obj.object === 'mark') {
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

          default:
            break;
        }
      }
    },
  },
];

let htmlSerializer = new Html({ rules });

export let toSlate = content => htmlSerializer.deserialize(content);

export let fromSlate = content => htmlSerializer.serialize(content);
