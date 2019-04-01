import { Block } from 'slate';
// TODO fix schema normalize
export default {
  document: {
    nodes: [
      { match: { type: 'heading1' }, min: 1, max: 1 },
      { match: { type: 'paragraph' }, min: 1 },
    ],
    normalize: (change, { code, node, child, index }) => {
      switch (code) {
        case 'child_type_invalid': {
          const type = index === 0 ? 'title' : 'paragraph';
          return change.setNodeByKey(child.key, type);
        }
        case 'child_required': {
          const block = Block.create(index === 0 ? 'title' : 'paragraph');
          return change.insertNodeByKey(node.key, index, block);
        }
      }
    },
  },
};
