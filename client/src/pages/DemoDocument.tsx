import React, { FC, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Value } from 'slate';
import { RouteComponentProps } from '@reach/router';

import Editor from 'components/Editor';
import { toSlate } from 'components/Editor/htmlSerializer';
import demoContent from 'components/Editor/_demoFixture';

const DemoDocument: FC<RouteComponentProps> = () => {
  const [content, setContent] = useState(toSlate(demoContent));

  return (
    <div>
      <Editor
        value={content}
        onChange={({ value }: { value: Value }) => setContent(value)}
      />
    </div>
  );
};

export default hot(DemoDocument);
