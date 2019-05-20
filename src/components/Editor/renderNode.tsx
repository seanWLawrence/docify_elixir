import React, { ReactNode } from 'react';
import { RenderNodeProps } from 'slate-react';
import { Editor } from 'slate';
import Checkbox from 'components/Checkbox';

/**
 * Render an HTML element (aka Slate node)
 */
export default function renderNode(
  props: RenderNodeProps,
  _editor: Editor,
  next: () => any
): ReactNode | void {
  let {
    attributes,
    children,
    node: { type, data },
  } = props;

  switch (type) {
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

    case 'link': {
      let href = data.get('href');
      let title = data.get('title');

      return (
        <a {...attributes} href={href} title={title}>
          {children}
        </a>
      );
    }

    case 'image': {
      let src = data.get('src');
      let alt = data.get('alt');

      return <img {...attributes} src={src} alt={alt} />;
    }

    case 'horizontal-rule':
      return (
        <div
          {...attributes}
          style={{
            border: 0,
            borderTop: '5px solid cornflowerblue',
            margin: '20px 0',
          }}
        >
          {children}
        </div>
      );

    case 'embed': {
      let src = data.get('src');

      return (
        <div
          {...attributes}
          style={{
            overflow: 'hidden',
            paddingBottom: '56.25%',
            position: 'relative',
            height: 0,
          }}
        >
          <iframe
            // TODO add title property
            title={src}
            src={src}
            allowFullScreen
            frameBorder="0"
            width="420"
            height="315"
            style={{
              left: 0,
              top: 0,
              height: '100%',
              width: '100%',
              position: 'absolute',
            }}
          />
          {children}
        </div>
      );
    }

    // TODO
    case 'table':
      return <table {...attributes}>{props.children}</table>;

    case 'table-row':
      return <tr {...attributes}>{props.children}</tr>;

    case 'table-head':
      return <th {...attributes}>{props.children}</th>;

    case 'table-cell':
      return <td {...attributes}>{props.children}</td>;

    default:
      return next();
  }
}
