import React from 'react';
import Html from 'slate-html-serializer';

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
            return <p {...attributes}>{children}</p>;

          case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>;

          case 'numbered-list':
            return <ol {...attributes}>{children}</ol>;

          case 'list-item':
            return <li {...attributes}>{children}</li>;

          case 'todo-list':
            return <Checkbox {...props} />;

          case 'heading1':
            return <h1 {...attributes}>{children}</h1>;

          case 'heading2':
            return <h2 {...attributes}>{children}</h2>;

          case 'heading3':
            return <h3 {...attributes}>{children}</h3>;

          case 'heading4':
            return <h4 {...attributes}>{children}</h4>;

          case 'heading5':
            return <h5 {...attributes}>{children}</h5>;

          case 'heading6':
            return <h6 {...attributes}>{children}</h6>;

          case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>;

          case 'code':
            return <code {...attributes}>{children}</code>;

          case 'horizontal-rule':
            return <hr />;

          case 'image':
            return <img src={props.src} alt={props.alt} />;

          case 'link':
            return (
              <a href={props.href} title={props.title}>
                {props.children}
              </a>
            );

          // TODO
          case 'table':
            return <table {...attributes}>{props.children}</table>;

          case 'table-row':
            return <tr {...attributes}>{props.children}</tr>;

          case 'table-head':
            return <th {...attributes}>{props.children}</th>;

          case 'table-cell':
            return <td {...attributes}>{props.children}</td>;
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
            return <strong {...attributes}>{children}</strong>;

          case 'code':
            return <code {...attributes}>{children}</code>;

          case 'italic':
            return <em {...attributes}>{children}</em>;

          case 'deleted':
            return <del {...attributes}>{children}</del>;

          case 'added':
            return <mark {...attributes}>{children}</mark>;
        }
      }
    },
  },
];

let htmlSerializer = new Html({ rules });

export let toSlate = content => htmlSerializer.deserialize(content);

export let fromSlate = content => htmlSerializer.serialize(content);
