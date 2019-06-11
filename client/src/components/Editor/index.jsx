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
import React, { Component } from 'react';
import { Editor as Slate } from 'slate-react';
import renderNode from './renderNode';
import renderMark from './renderMark';
import onKeyDown from './onKeyDown';
import plugins from './plugins';
// TODO update and add schema with fixed heading
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = function (instance) {
            _this.editor = instance;
        };
        return _this;
    }
    Editor.prototype.componentDidMount = function () {
        if (this.editor !== null) {
            this.editor.moveFocusToEndOfDocument();
        }
    };
    Editor.prototype.render = function () {
        var _a = this, ref = _a.ref, _b = _a.props, onChange = _b.onChange, value = _b.value, readOnly = _b.readOnly;
        return (<Slate autoFocus autoCorrect spellCheck renderNode={renderNode} renderMark={renderMark} onKeyDown={onKeyDown} onChange={onChange} value={value} ref={ref} plugins={plugins} placeholder="Start writing here..." readOnly={readOnly}/>);
    };
    Editor.defaultProps = {
        readOnly: false,
        onChange: function () { },
    };
    return Editor;
}(Component));
export default Editor;
