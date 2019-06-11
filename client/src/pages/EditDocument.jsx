var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { Component } from 'react';
import { debounce, isUndefined, get } from 'lodash';
import { graphql, compose, } from 'react-apollo';
import gql from 'graphql-tag';
import { Value } from 'slate';
import Editor from 'components/Editor';
import Toast from 'components/Toast';
import Spinner from 'components/Spinner';
var SAVE_INTERVAL_IN_MILLISECONDS = 3000;
var EditDocument = /** @class */ (function (_super) {
    __extends(EditDocument, _super);
    function EditDocument() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            documentContent: null,
            toastIsVisible: false,
        };
        _this.debouncedMutation = debounce(_this.props.mutate, SAVE_INTERVAL_IN_MILLISECONDS);
        _this.onChange = function (_a) {
            var value = _a.value;
            if (_this.state.documentContent &&
                value.document !== get(_this.state.documentContent, 'document')) {
                var self_1 = _this;
                _this.debouncedMutation({
                    variables: {
                        documentId: _this.props.documentId,
                        content: toGraphQl(value),
                    },
                    update: function () {
                        self_1.setState({ toastIsVisible: true });
                        setTimeout(function () {
                            return (self_1.setState({ toastIsVisible: false }),
                                TOAST_DISPLAY_LENGTH_IN_MILLISECONDS);
                        });
                    },
                });
            }
            _this.setState({ documentContent: value });
        };
        return _this;
    }
    EditDocument.prototype.render = function () {
        var _a = this, _b = _a.props.data, loading = _b.loading, error = _b.error, document = _b.document, _c = _a.state, stateDocumentContent = _c.documentContent, toastIsVisible = _c.toastIsVisible, onChange = _a.onChange;
        if (loading) {
            return <Spinner />;
        }
        if (!isUndefined(document)) {
            var queryContent = document.content;
            return (<div>
          <Editor value={stateDocumentContent || fromGraphQl(queryContent)} onChange={onChange}/>

          {toastIsVisible && <Toast message="Saved successfully!"/>}
        </div>);
        }
        return (<Toast message={"There was an error loading your document. " + (error ? error.message : error)}/>);
    };
    return EditDocument;
}(Component));
var EditDocumentFragments = {
    document: gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment EditDocumentDocument on Document {\n      id\n      content\n    }\n  "], ["\n    fragment EditDocumentDocument on Document {\n      id\n      content\n    }\n  "]))),
};
var fromGraphQl = function (value) { return Value.fromJSON(JSON.parse(value)); };
var toGraphQl = function (value) { return JSON.stringify(value.toJSON()); };
var TOAST_DISPLAY_LENGTH_IN_MILLISECONDS = 3000;
var DOCUMENT_QUERY = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query DocumentQuery($documentId: ID!) {\n    document(documentId: $documentId) {\n      ...EditDocumentDocument\n    }\n  }\n  ", "\n"], ["\n  query DocumentQuery($documentId: ID!) {\n    document(documentId: $documentId) {\n      ...EditDocumentDocument\n    }\n  }\n  ", "\n"])), EditDocumentFragments.document);
var EDIT_DOCUMENT_MUTATION = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  mutation UpdateDocument($documentId: ID!, $content: String!) {\n    updateDocumentContent(documentId: $documentId, content: $content) {\n      document {\n        id\n        content\n      }\n    }\n  }\n"], ["\n  mutation UpdateDocument($documentId: ID!, $content: String!) {\n    updateDocumentContent(documentId: $documentId, content: $content) {\n      document {\n        id\n        content\n      }\n    }\n  }\n"])));
export default compose(graphql(DOCUMENT_QUERY, {
    options: function (_a) {
        var documentId = _a.documentId;
        return { variables: { documentId: documentId } };
    },
}), graphql(EDIT_DOCUMENT_MUTATION))(EditDocument);
var templateObject_1, templateObject_2, templateObject_3;
