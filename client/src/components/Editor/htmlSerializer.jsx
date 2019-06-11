import React from 'react';
import Html from 'slate-html-serializer';
var BLOCK_TYPE = {
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
var INLINE_TYPE = {
    strong: 'bold',
    code: 'code',
    em: 'italic',
    u: 'underlined',
    del: 'deleted',
    mark: 'added',
};
var isBlockTypeKey = function (str) {
    return Object.keys(BLOCK_TYPE).includes(str);
};
var isInlineTypeKey = function (str) {
    return Object.keys(INLINE_TYPE).includes(str);
};
var isBlockType = function (htmlElementType) {
    return isBlockTypeKey(htmlElementType)
        ? BLOCK_TYPE[htmlElementType]
        : void 0;
};
var isInlineType = function (htmlElementType) {
    return isInlineTypeKey(htmlElementType)
        ? INLINE_TYPE[htmlElementType]
        : void 0;
};
var rules = [
    {
        deserialize: function (el, next) {
            var htmlElementType = el.tagName.toLowerCase();
            if (isBlockType(htmlElementType)) {
                return {
                    object: 'block',
                    type: htmlElementType,
                    data: {
                        className: el.getAttribute('class'),
                    },
                    nodes: next(el.childNodes),
                };
            }
            else if (isInlineType(htmlElementType)) {
                return {
                    object: 'mark',
                    type: htmlElementType,
                    nodes: next(el.childNodes),
                };
            }
            return void 0;
        },
        serialize: function (obj, children) {
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
                        return <img src={obj.src} alt={obj.alt}/>;
                    case 'link':
                        return (<a href={obj.href} title={obj.title}>
                {obj.children}
              </a>);
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
            else if (obj.type === 'mark') {
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
var htmlSerializer = new Html({ rules: rules });
export var toSlate = function (content) {
    return htmlSerializer.deserialize(content);
};
export var fromSlate = function (content) {
    return htmlSerializer.serialize(content);
};
