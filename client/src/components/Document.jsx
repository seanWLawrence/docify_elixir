var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import gql from 'graphql-tag';
import { Link } from '@reach/router';
import { Value } from 'slate';
import Editor from './Editor';
var Document = function (_a) {
    var _b = _a.document, id = _b.id, content = _b.content, updatedAt = _b.updatedAt;
    return (<Link key={id} to={"/documents/edit/" + id}>
      <div>
        <Editor readOnly value={fromGraphQl(content)}/>
        <p>{toPrettyDate(updatedAt)}</p>
      </div>
    </Link>);
};
export var DocumentFragments = {
    document: gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment DocumentDocument on Document {\n      id\n      content\n      updatedAt\n    }\n  "], ["\n    fragment DocumentDocument on Document {\n      id\n      content\n      updatedAt\n    }\n  "]))),
};
export default Document;
var fromGraphQl = function (value) { return Value.fromJSON(JSON.parse(value)); };
var toPrettyDate = function (date) {
    return new Date(date).toLocaleDateString('en-US');
};
var templateObject_1;
