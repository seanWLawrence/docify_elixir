import {
  BlockTypeValue,
  InlineTypeValue,
} from 'components/Editor/htmlSerializer';
import { Plugin } from 'slate-react';

export default function NoEmpty(type: BlockTypeValue | InlineTypeValue): Plugin;
