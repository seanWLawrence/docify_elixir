import { px, rem } from './mixins';

export const BASE_FONT_SIZE = 10;

export const BASE_GAP = 5;

export const MOBILE_WIDTH = 330;
export const TABLET_WIDTH = 768;
export const DESKTOP_WIDTH = 1028;
export const RETINA_WIDTH = 1400;

export default {
  color: {
    white: '#fff',
    light: '#eee',
    medium: 'rgba(0, 0, 0, 0.7)',
    dark: 'rgba(0, 0, 0, 0.9)',

    primary: 'cornflowerblue',
    secondary: '#eee',

    heading: 'rgba(0, 0, 0, 0.9)',
    body: 'rgba(0, 0, 0, 0.7)',
  },
  font: {
    size: {
      h1: rem(BASE_FONT_SIZE * 4),
      h2: rem(BASE_FONT_SIZE * 3.5),
      h3: rem(BASE_FONT_SIZE * 3),
      h4: rem(BASE_FONT_SIZE * 2.5),
      h5: rem(BASE_FONT_SIZE * 2),
      h6: rem(BASE_FONT_SIZE * 1.5),
      body: rem(BASE_FONT_SIZE),
      blockquote: rem(BASE_FONT_SIZE * 1.25),
    },
    family: {
      heading: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
  'Segoe UI Symbol'`,
      body: `Georgia, 'Times New Roman', Times, serif`,
    },
  },
  gap: px(BASE_GAP),
  media: {
    mobile: px(MOBILE_WIDTH),
    tablet: px(TABLET_WIDTH),
    desktop: px(DESKTOP_WIDTH),
    retina: px(RETINA_WIDTH),
  },
};
