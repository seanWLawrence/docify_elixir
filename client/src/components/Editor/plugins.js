import AutoReplace from 'slate-auto-replace';
import NoEmpty from 'slate-no-empty';
import CollapseOnEscape from 'slate-collapse-on-escape';
import isHotKey from 'is-hotkey';
import { defaultTo, first, split, last, isEqual, pipe, getOr, tail, join, stubTrue, cond, includes, } from 'lodash/fp';
var MarkHotkey = function (_a) {
    var type = _a.type, key = _a.key;
    return {
        onKeyDown: function (event, editor, next) {
            if (isHotKey(key, event)) {
                event.preventDefault();
                return editor.toggleMark(type);
            }
            return next();
        },
    };
};
export default [
    CollapseOnEscape(),
    NoEmpty('paragraph'),
    // adds bold on 'command + b'
    MarkHotkey({ key: 'mod+b', type: 'bold' }),
    // adds underlined on 'command + u'
    MarkHotkey({ key: 'mod+u', type: 'underlined' }),
    // adds italic on 'command + i'
    MarkHotkey({ key: 'mod+i', type: 'italic' }),
    // adds code on 'control + `'
    MarkHotkey({ key: 'ctrl+`', type: 'code' }),
    // adds deleted on 'control + shift + `'
    MarkHotkey({ key: 'ctrl+shift+`', type: 'deleted' }),
    // inserts block quote with '>'
    AutoReplace({
        trigger: 'space',
        before: /^(>)$/,
        change: function (change, _e, _matches) {
            return change.setBlocks({ type: 'block-quote' });
        },
    }),
    // inserts h1 with '#'
    AutoReplace({
        trigger: 'space',
        before: /^(#)$/,
        change: function (change, _e, _matches) {
            return change.setBlocks({ type: 'heading1' });
        },
    }),
    // inserts h2 with '##'
    AutoReplace({
        trigger: 'space',
        before: /^(##)$/,
        change: function (change, _e, _matches) {
            return change.setBlocks({ type: 'heading2' });
        },
    }),
    // inserts h3 with '###'
    AutoReplace({
        trigger: 'space',
        before: /^(###)$/,
        change: function (change, _e, _matches) {
            return change.setBlocks({ type: 'heading3' });
        },
    }),
    // inserts h4 with '####'
    AutoReplace({
        trigger: 'space',
        before: /^(####)$/,
        change: function (change, _e, _matches) {
            return change.setBlocks({ type: 'heading4' });
        },
    }),
    // inserts h5 with '#####'
    AutoReplace({
        trigger: 'space',
        before: /^(#####)$/,
        change: function (change, _e, _matches) {
            return change.setBlocks({ type: 'heading5' });
        },
    }),
    // inserts h6 with '######'
    AutoReplace({
        trigger: 'space',
        before: /^(######)$/,
        change: function (change, _e, _matches) {
            return change.setBlocks({ type: 'heading6' });
        },
    }),
    // inserts bulleted list with li when '-', '+', or '*' are typed
    AutoReplace({
        trigger: 'space',
        before: /^(-|\+|\*)$/,
        change: function (change, _e, _matches) {
            change.setBlocks({ type: 'list-item' });
            return change.wrapBlock('bulleted-list');
        },
    }),
    // inserts numbered list with li when '[number].' are typed
    AutoReplace({
        trigger: 'space',
        before: /^([1-9]\.)$/,
        change: function (change, _e, _matches) {
            change.setBlocks({ type: 'list-item' });
            return change.wrapBlock('numbered-list');
        },
    }),
    // adds unchecked checkbox on '[]'
    AutoReplace({
        trigger: 'space',
        before: /^(\[\])$/,
        change: function (change, _e, _matches) {
            change.setBlocks({ type: 'todo-list', data: { checked: false } });
        },
    }),
    // adds checked checkbox on '[x]'
    AutoReplace({
        trigger: 'space',
        before: /^(\[x\])$/,
        change: function (change, _e, _matches) {
            change.setBlocks({ type: 'todo-list', data: { checked: true } });
        },
    }),
    // formats inline code with '`'
    AutoReplace({
        trigger: '`',
        before: /.|^/,
        change: function (change, _e, _matches) { return change.toggleMark({ type: 'code' }); },
    }),
    // formats code blocks with '```'
    AutoReplace({
        trigger: '```',
        before: /.|^/,
        change: function (change, _e, _matches) { return change.setBlocks({ type: 'code' }); },
    }),
    // format bold or italic with '*' or '**'
    AutoReplace({
        trigger: '*',
        before: /.|^/,
        change: function (change, _e, matches) {
            var isItalic = change.value.marks.some(function (mark) {
                return isEqual(mark.type, 'italic');
            });
            change.toggleMark({ type: 'italic' });
            if (!isStartOfWord(matches) && !isItalic) {
                return change.toggleMark({ type: 'bold' });
            }
            if (isStartOfWord(matches) && isItalic) {
                return change.replaceMark('italic', 'bold');
            }
            return void 0;
        },
    }),
    // format bold or italic with '_' or '__'
    AutoReplace({
        trigger: '_',
        before: /.|^/,
        change: function (change, _e, matches) {
            var isItalic = pipe(getOr('', 'type'), isEqual('italic'));
            var hasItalicMark = change.value.marks.some(isItalic);
            change.toggleMark({ type: 'italic' });
            if (!isStartOfWord(matches) && !hasItalicMark) {
                return change.toggleMark({ type: 'bold' });
            }
            if (isStartOfWord(matches) && hasItalicMark) {
                return change.replaceMark('italic', 'bold');
            }
            return void 0;
        },
    }),
    // format marked or strikethrough with '~' or '~~'
    AutoReplace({
        trigger: '~',
        before: /.|^/,
        change: function (change, _e, matches) {
            var isMarked = pipe(getOr('', 'type'), isEqual('added'));
            var hasMarks = change.value.marks.some(isMarked);
            change.toggleMark({ type: 'added' });
            if (!isStartOfWord(matches) && !hasMarks) {
                return change.toggleMark({ type: 'deleted' });
            }
            if (isStartOfWord(matches) && hasMarks) {
                return change.replaceMark('added', 'deleted');
            }
            return void 0;
        },
    }),
    // create links on '[link text](href)' or images on '![alt text](src)'
    AutoReplace({
        trigger: 'space',
        before: /(!?\[.*\]\(.*\))/i,
        change: function (change, _e, matches) {
            return change
                .insertText(" " + title(matches))
                .moveFocusBackward(title(matches).length)
                .wrapInline(imageOrLink(matches))
                .moveToEnd()
                .insertText(' ');
        },
    }),
    // creates <hr /> with '---' or '***' or '===' on 'space'
    AutoReplace({
        trigger: 'space',
        before: /^(---|===|\*\*\*)/,
        change: function (change, _e, _matches) {
            return change.wrapBlock({ type: 'horizontal-rule' });
        },
    }),
    // creates <hr /> with '---' or '***' or '===' on 'enter'
    AutoReplace({
        trigger: 'enter',
        before: /^(---|===|\*\*\*)/,
        change: function (change, _e, _matches) {
            return change.wrapBlock({ type: 'horizontal-rule' });
        },
    }),
    // create plugins on 'embed()'
    AutoReplace({
        trigger: 'space',
        before: /(embed\(.*\))/i,
        change: function (change, _e, matches) {
            change.insertBlock({
                type: 'embed',
                data: { src: embedSrc(matches) },
            });
        },
    }),
];
var lastCharacter = pipe(getOr('', 'before.input'), last);
var isStartOfWord = pipe(lastCharacter, isEqual(' '));
var splitLink = pipe(getOr('', 'before[0]'), split(']('));
var title = pipe(splitLink, first, tail, join(''));
var href = pipe(splitLink, last, defaultTo(''), split(')'), first, defaultTo(''));
var alt = pipe(splitLink, first, tail, tail, join(''));
var src = href;
var iframeSrc = pipe(getOr('', 'before[0]'), pipe(split('src="'), last, defaultTo(''), split('"'), first
// defaultTo('')
));
var isImage = pipe(getOr('', 'before[0]'), includes('!'));
var imageData = function (matches) { return ({
    type: 'image',
    data: { src: src(matches), alt: alt(matches) },
}); };
var linkData = function (matches) { return ({
    type: 'link',
    data: { href: href(matches), title: title(matches) },
}); };
var imageOrLink = cond([
    [isImage, imageData],
    [stubTrue, linkData],
]);
var isIframe = pipe(getOr('', 'before[0]'), includes('src'));
var stripEmbedTag = pipe(getOr('', 'before[0]'), split('embed('), last, defaultTo(''), split(')'), first);
var embedSrc = cond([[isIframe, iframeSrc], [stubTrue, stripEmbedTag]]);
