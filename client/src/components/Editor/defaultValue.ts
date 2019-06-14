import { Value } from 'slate';

const defaultValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '',
                object: 'leaf',
              },
            ],
          },
        ],
      },
    ],
  },
});

export default defaultValue;
