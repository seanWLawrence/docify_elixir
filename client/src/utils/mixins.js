var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { css } from '@emotion/core';
import theme, { TABLET_WIDTH, DESKTOP_WIDTH, RETINA_WIDTH } from 'utils/theme';
export var px = function (num) { return num + "px"; };
export var em = function (num) { return num + "em"; };
export var rem = function (num) { return num + "rem"; };
export var percent = function (num) { return num + "%"; };
export var underlineOnHover = function () { return css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  &:hover {\n    transition: all ease-in 0.5s;\n    color: ", ";\n    border-bottom: ", " solid ", ";\n  }\n"], ["\n  &:hover {\n    transition: all ease-in 0.5s;\n    color: ", ";\n    border-bottom: ", " solid ", ";\n  }\n"])), theme.color.medium, theme.gap, theme.color.primary); };
export var flexbox = function (_a) {
    var _b = _a.direction, direction = _b === void 0 ? 'row' : _b, _c = _a.justify, justify = _c === void 0 ? 'flex-start' : _c, _d = _a.align, align = _d === void 0 ? 'flex-start' : _d, _e = _a.wrap, wrap = _e === void 0 ? 'no-wrap' : _e;
    return css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: ", ";\n    justify-content: ", ";\n    align-items: ", ";\n    flex-wrap: ", ";\n  "], ["\n    display: flex;\n    flex-direction: ", ";\n    justify-content: ", ";\n    align-items: ", ";\n    flex-wrap: ", ";\n  "])), direction, justify, align, wrap);
};
var media = function (mediaType) { return function (styles) {
    switch (mediaType) {
        case 'MOBILE':
            return css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        @media (max-width: ", ") {\n          ", "\n        }\n      "], ["\n        @media (max-width: ", ") {\n          ", "\n        }\n      "])), px(TABLET_WIDTH - 1), styles);
        case 'TABLET':
            return css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        @media (min-width: ", ") and (max-width: ", ") {\n          ", "\n        }\n      "], ["\n        @media (min-width: ", ") and (max-width: ",
                ") {\n          ", "\n        }\n      "])), px(TABLET_WIDTH), px(DESKTOP_WIDTH - 1), styles);
        case 'DESKTOP':
            return css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        @media (min-width: ", ") and (max-width: ", ") {\n          ", "\n        }\n      "], ["\n        @media (min-width: ", ") and (max-width: ",
                ") {\n          ", "\n        }\n      "])), px(DESKTOP_WIDTH), px(RETINA_WIDTH - 1), styles);
        case 'RETINA':
            return css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n        @media (min-width: ", ") {\n          ", "\n        }\n      "], ["\n        @media (min-width: ", ") {\n          ", "\n        }\n      "])), px(RETINA_WIDTH), styles);
    }
}; };
export var mobile = media('MOBILE');
export var tablet = media('TABLET');
export var desktop = media('DESKTOP');
export var retina = media('RETINA');
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
