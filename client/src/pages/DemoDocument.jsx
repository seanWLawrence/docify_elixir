import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Editor from 'components/Editor';
import { toSlate } from 'components/Editor/htmlSerializer';
import demoContent from 'components/Editor/_demoFixture';
var DemoDocument = function () {
    var _a = useState(toSlate(demoContent)), content = _a[0], setContent = _a[1];
    return (<div>
      <Editor value={content} onChange={function (_a) {
        var value = _a.value;
        return setContent(value);
    }}/>
    </div>);
};
export default hot(DemoDocument);
